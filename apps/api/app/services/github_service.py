from __future__ import annotations

import json
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from app.config.settings import settings
from app.schemas.github_review import GitHubPullRequestReviewCreateRequest, GitHubPullRequestReviewResponse, GitHubReviewPostResponse
from app.schemas.review import ReviewCreateRequest
from app.repositories.store import new_telemetry_snapshot, security_store
from app.services.review_service import create_review


def _build_review_body(review) -> str:
    sections: list[str] = [f"GoAegis security review for `{review.target_label}`", "", review.summary, ""]

    if review.top_risks:
        sections.append("Top Risks:")
        sections.extend([f"- {item}" for item in review.top_risks])
        sections.append("")

    if review.recommended_improvements:
        sections.append("Recommended Improvements:")
        sections.extend([f"- {item}" for item in review.recommended_improvements])
        sections.append("")

    if review.architecture_concerns:
        sections.append("Architecture Concerns:")
        sections.extend([f"- {item}" for item in review.architecture_concerns])
        sections.append("")

    if review.comments:
        sections.append("Inline Comments:")
        for comment in review.comments:
            suggestion = f" Suggestion: {comment.suggestion}" if comment.suggestion else ""
            sections.append(f"- {comment.path}:{comment.line} [{comment.severity}] {comment.message}{suggestion}")

    return "\n".join(part for part in sections if part is not None).strip()


def _post_github_review(
    request: GitHubPullRequestReviewCreateRequest,
    review,
) -> GitHubReviewPostResponse:
    if not settings.github_token:
        return GitHubReviewPostResponse(status="skipped", message="GitHub token is not configured.")

    review_url = f"{settings.github_api_url.rstrip('/')}/repos/{request.owner}/{request.repo}/pulls/{request.pull_number}/reviews"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {settings.github_token}",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "User-Agent": "GoAegis/1.0",
    }

    comments_payload = []
    if request.head_sha:
        for comment in review.comments:
            comments_payload.append(
                {
                    "path": comment.path,
                    "line": comment.line,
                    "side": "RIGHT",
                    "body": f"{comment.message}"
                    + (f"\nSuggestion: {comment.suggestion}" if comment.suggestion else ""),
                }
            )

    payload = {
        "body": _build_review_body(review),
        "event": "COMMENT",
    }
    if request.head_sha:
        payload["commit_id"] = request.head_sha
    if comments_payload:
        payload["comments"] = comments_payload

    def send(payload_body: dict[str, object]) -> GitHubReviewPostResponse:
        data = json.dumps(payload_body).encode("utf-8")
        request_obj = Request(review_url, data=data, headers=headers, method="POST")
        try:
            with urlopen(request_obj, timeout=30) as response:
                response_data = json.loads(response.read().decode("utf-8"))
        except HTTPError as exc:
            raise RuntimeError(exc.read().decode("utf-8") or exc.reason) from exc
        except URLError as exc:
            raise RuntimeError(str(exc.reason)) from exc

        return GitHubReviewPostResponse(
            status="published",
            reviewId=int(response_data.get("id")) if response_data.get("id") is not None else None,
            reviewUrl=str(response_data.get("html_url") or ""),
            message="Review published to GitHub.",
        )

    try:
        return send(payload)
    except RuntimeError:
        if comments_payload:
            fallback = dict(payload)
            fallback.pop("comments", None)
            try:
                return send(fallback)
            except RuntimeError as fallback_error:
                return GitHubReviewPostResponse(status="failed", message=str(fallback_error))
        return GitHubReviewPostResponse(status="failed", message="Failed to publish GitHub review.")


def create_github_pull_request_review(
    request: GitHubPullRequestReviewCreateRequest,
) -> GitHubPullRequestReviewResponse:
    review_request = ReviewCreateRequest(
        project_id=request.project_id,
        repository_id=request.repository_id,
        source=request.source,
        path=request.path,
        title=request.title,
        content=request.content,
        diff=request.diff,
        provider=request.provider,
    )
    review = create_review(review_request)
    post_result = _post_github_review(request, review)

    if post_result.status == "published" and settings.telemetry_enabled:
        security_store.save_telemetry(
            new_telemetry_snapshot(
                anonymous_id=f"github:{request.repository_id}",
                event_name="review_published",
                source="github-pr-review",
                properties={
                    "projectId": request.project_id,
                    "repositoryId": request.repository_id,
                    "pullNumber": request.pull_number,
                },
            )
        )

    return GitHubPullRequestReviewResponse(
        review_id=review.review_id,
        project_id=review.project_id,
        repository_id=review.repository_id,
        source=review.source,
        target_label=review.target_label,
        provider=review.provider,
        score=review.score,
        severity=review.severity,
        summary=review.summary,
        top_risks=review.top_risks,
        recommended_improvements=review.recommended_improvements,
        architecture_concerns=review.architecture_concerns,
        comments=review.comments,
        published=post_result.status == "published",
        github_review_id=post_result.review_id,
        github_review_url=post_result.review_url,
        github_status=post_result.status,
        github_message=post_result.message,
    )
