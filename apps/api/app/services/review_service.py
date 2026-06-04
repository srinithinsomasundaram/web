from __future__ import annotations

from dataclasses import dataclass

from app.repositories.store import ReviewCommentSnapshot, new_review_snapshot, security_store
from app.schemas.review import ReviewCommentResponse, ReviewCreateRequest, ReviewResponse
from app.services.ai_service import generate_review
from app.services.security_engine import calculate_security_score, max_severity, run_security_scan


@dataclass(slots=True)
class ReviewCommentRecord:
    path: str
    line: int
    severity: str
    message: str
    suggestion: str | None = None


def _score_from_comments(comments: list[ReviewCommentRecord]) -> int:
    penalty = sum(
        {
            "low": 2,
            "medium": 8,
            "high": 20,
            "critical": 40,
        }.get(comment.severity, 8)
        for comment in comments
    )
    return max(0, 100 - penalty)


def create_review(request: ReviewCreateRequest) -> ReviewResponse:
    findings = []
    if request.path:
        findings = run_security_scan(request.project_id, request.repository_id, request.path)

    review_payload = generate_review(
        request.provider or "gemini",
        findings,
        request.path or request.title or "current-file",
        request.path,
        request.content,
        request.diff,
    )

    comment_records = [
        ReviewCommentRecord(
            path=str(comment.get("path") or request.path or request.title or "current-file"),
            line=int(comment.get("line") or 1),
            severity=str(comment.get("severity") or "medium"),
            message=str(comment.get("message") or "Review comment"),
            suggestion=str(comment["suggestion"]) if comment.get("suggestion") else None,
        )
        for comment in review_payload["comments"]
        if isinstance(comment, dict)
    ]

    score = calculate_security_score(findings) if findings else _score_from_comments(comment_records)
    severity = max_severity(findings)
    if not findings and comment_records:
        severity = max(comment_records, key=lambda comment: {"low": 0, "medium": 1, "high": 2, "critical": 3}.get(comment.severity, 1)).severity

    review_snapshot = new_review_snapshot(
        project_id=request.project_id,
        repository_id=request.repository_id,
        source=request.source,
        target_label=request.path or request.title or "current-file",
        score=score,
        severity=severity,
        summary=str(review_payload["summary"]),
        provider=str(review_payload["provider"]),
    )
    security_store.save_review(
        review_snapshot,
        [
            ReviewCommentSnapshot(
                review_id=review_snapshot.review_id,
                path=comment.path,
                line=comment.line,
                severity=comment.severity,
                message=comment.message,
                suggestion=comment.suggestion,
            )
            for comment in comment_records
        ],
    )

    return ReviewResponse(
        reviewId=review_snapshot.review_id,
        projectId=request.project_id,
        repositoryId=request.repository_id,
        source=request.source,
        targetLabel=review_snapshot.target_label,
        provider=review_snapshot.provider,
        score=score,
        severity=severity,
        summary=str(review_payload["summary"]),
        topRisks=[str(item) for item in review_payload["top_risks"]],
        recommendedImprovements=[str(item) for item in review_payload["recommended_improvements"]],
        architectureConcerns=[str(item) for item in review_payload["architecture_concerns"]],
        comments=[
            ReviewCommentResponse(
                path=comment.path,
                line=comment.line,
                severity=comment.severity,
                message=comment.message,
                suggestion=comment.suggestion,
            )
            for comment in comment_records
        ],
    )
