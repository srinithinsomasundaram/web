from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Protocol
from uuid import uuid4

from app.config.settings import settings
from app.services.security_engine import FindingRecord


@dataclass(slots=True)
class ScanSnapshot:
    scan_id: str
    project_id: str
    repository_id: str
    score: int
    max_severity: str
    scan_type: str
    created_at: str


@dataclass(slots=True)
class FixSnapshot:
    fix_id: str
    project_id: str
    finding_id: str
    provider: str
    patch: str
    explanation: str


@dataclass(slots=True)
class ReviewSnapshot:
    review_id: str
    project_id: str
    repository_id: str
    source: str
    target_label: str
    score: int
    severity: str
    summary: str
    provider: str


@dataclass(slots=True)
class ReviewCommentSnapshot:
    review_id: str
    path: str
    line: int
    severity: str
    message: str
    suggestion: str | None = None


@dataclass(slots=True)
class TelemetrySnapshot:
    event_id: str
    anonymous_id: str
    event_name: str
    source: str | None
    properties: dict[str, str | int | bool | None]
    created_at: str


class SecurityStore(Protocol):
    def save_scan(self, scan: ScanSnapshot, findings: list[FindingRecord]) -> None: ...
    def save_fix(self, fix: FixSnapshot) -> None: ...
    def save_review(self, review: ReviewSnapshot, comments: list[ReviewCommentSnapshot]) -> None: ...
    def latest_project_score(self, project_id: str) -> tuple[int, str] | None: ...
    def list_project_scans(self, project_id: str, limit: int = 10) -> list[ScanSnapshot]: ...
    def latest_review(self, project_id: str) -> tuple[ReviewSnapshot, list[ReviewCommentSnapshot]] | None: ...
    def save_telemetry(self, event: TelemetrySnapshot) -> None: ...
    def telemetry_summary(self) -> dict[str, int]: ...
    def count_findings(self, project_id: str, scanner: str | None = None) -> int: ...
    def find_finding_by_id(self, finding_id: str) -> FindingRecord | None: ...


class MemorySecurityStore:
    def __init__(self) -> None:
        self.scans: dict[str, ScanSnapshot] = {}
        self.findings: list[FindingRecord] = []
        self.fixes: dict[str, FixSnapshot] = {}
        self.reviews: list[ReviewSnapshot] = []
        self.review_comments: dict[str, list[ReviewCommentSnapshot]] = {}
        self.telemetry: list[TelemetrySnapshot] = []

    def save_scan(self, scan: ScanSnapshot, findings: list[FindingRecord]) -> None:
        self.scans[scan.scan_id] = scan
        self.findings.extend(findings)

    def save_fix(self, fix: FixSnapshot) -> None:
        self.fixes[fix.fix_id] = fix

    def save_review(self, review: ReviewSnapshot, comments: list[ReviewCommentSnapshot]) -> None:
        self.reviews.append(review)
        self.review_comments[review.review_id] = comments

    def latest_project_score(self, project_id: str) -> tuple[int, str] | None:
        matching = sorted(
            (scan for scan in self.scans.values() if scan.project_id == project_id),
            key=lambda scan: scan.created_at,
        )
        if not matching:
            return None
        latest = matching[-1]
        return latest.score, latest.max_severity

    def list_project_scans(self, project_id: str, limit: int = 10) -> list[ScanSnapshot]:
        matching = sorted(
            (scan for scan in self.scans.values() if scan.project_id == project_id),
            key=lambda scan: scan.created_at,
            reverse=True,
        )
        return matching[:limit]

    def latest_review(self, project_id: str) -> tuple[ReviewSnapshot, list[ReviewCommentSnapshot]] | None:
        for review in reversed(self.reviews):
            if review.project_id == project_id:
                return review, self.review_comments.get(review.review_id, [])
        return None

    def save_telemetry(self, event: TelemetrySnapshot) -> None:
        self.telemetry.append(event)

    def telemetry_summary(self) -> dict[str, int]:
        def count(*event_names: str) -> int:
            return sum(1 for event in self.telemetry if event.event_name in event_names)

        return {
            "workspace_scans": count("scan_completed", "workspace_scan"),
            "fixes_applied": count("fix_applied"),
            "reviews_generated": count("review_completed", "review_generated"),
            "reviews_published": count("review_published"),
        }

    def count_findings(self, project_id: str, scanner: str | None = None) -> int:
        return sum(
            1
            for finding in self.findings
            if finding.project_id == project_id and (scanner is None or finding.scanner == scanner)
        )

    def find_finding_by_id(self, finding_id: str) -> FindingRecord | None:
        return next((finding for finding in self.findings if finding.id == finding_id), None)


class PostgresSecurityStore:
    def __init__(self, database_url: str) -> None:
        self.database_url = database_url

    def _connect(self):
        import psycopg

        return psycopg.connect(self.database_url)

    def _ensure_schema(self) -> None:
        schema = """
        create table if not exists projects (
            id text primary key,
            name text not null,
            created_at timestamptz not null default now()
        );

        create table if not exists repositories (
            id text primary key,
            project_id text not null references projects(id) on delete cascade,
            url text not null,
            created_at timestamptz not null default now()
        );

        create table if not exists scans (
            id text primary key,
            project_id text not null references projects(id) on delete cascade,
            repository_id text not null references repositories(id) on delete cascade,
            score integer not null,
            max_severity text not null,
            scan_type text not null,
            created_at timestamptz not null
        );

        create table if not exists findings (
            id text primary key,
            scan_id text not null references scans(id) on delete cascade,
            project_id text not null references projects(id) on delete cascade,
            repository_id text not null references repositories(id) on delete cascade,
            scanner text not null,
            rule_id text not null,
            title text not null,
            description text not null,
            severity text not null,
            file_path text not null,
            line_start integer,
            line_end integer,
            fingerprint text not null,
            created_at timestamptz not null
        );

        create table if not exists fixes (
            id text primary key,
            project_id text not null references projects(id) on delete cascade,
            finding_id text not null,
            provider text not null,
            patch text not null,
            explanation text not null,
            created_at timestamptz not null default now()
        );

        create table if not exists reviews (
            id text primary key,
            project_id text not null references projects(id) on delete cascade,
            repository_id text not null references repositories(id) on delete cascade,
            source text not null,
            target_label text not null,
            score integer not null,
            severity text not null,
            summary text not null,
            provider text not null,
            created_at timestamptz not null default now()
        );

        create table if not exists review_comments (
            id bigserial primary key,
            review_id text not null references reviews(id) on delete cascade,
            path text not null,
            line integer not null,
            severity text not null,
            message text not null,
            suggestion text
        );

        create table if not exists telemetry_events (
            event_id text primary key,
            anonymous_id text not null,
            event_name text not null,
            source text,
            properties jsonb not null,
            created_at timestamptz not null default now()
        );
        """
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(schema)
            connection.commit()

    def _ensure_project_and_repository(self, project_id: str, repository_id: str) -> None:
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "insert into projects (id, name) values (%s, %s) on conflict (id) do nothing",
                    (project_id, project_id),
                )
                cursor.execute(
                    """
                    insert into repositories (id, project_id, url)
                    values (%s, %s, %s)
                    on conflict (id) do nothing
                    """,
                    (repository_id, project_id, repository_id),
                )
            connection.commit()

    def save_scan(self, scan: ScanSnapshot, findings: list[FindingRecord]) -> None:
        self._ensure_schema()
        self._ensure_project_and_repository(scan.project_id, scan.repository_id)
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    insert into scans (id, project_id, repository_id, score, max_severity, scan_type, created_at)
                    values (%s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        scan.scan_id,
                        scan.project_id,
                        scan.repository_id,
                        scan.score,
                        scan.max_severity,
                        scan.scan_type,
                        scan.created_at,
                    ),
                )
                for finding in findings:
                    cursor.execute(
                        """
                        insert into findings (
                            id, scan_id, project_id, repository_id, scanner, rule_id, title,
                            description, severity, file_path, line_start, line_end, fingerprint, created_at
                        ) values (
                            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                        )
                        """,
                        (
                            finding.id,
                            scan.scan_id,
                            finding.project_id,
                            finding.repository_id,
                            finding.scanner,
                            finding.rule_id,
                            finding.title,
                            finding.description,
                            finding.severity,
                            finding.file_path,
                            finding.line_start,
                            finding.line_end,
                            finding.fingerprint,
                            finding.created_at,
                        ),
                    )
            connection.commit()

    def save_fix(self, fix: FixSnapshot) -> None:
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    insert into fixes (id, project_id, finding_id, provider, patch, explanation)
                    values (%s, %s, %s, %s, %s, %s)
                    """,
                    (fix.fix_id, fix.project_id, fix.finding_id, fix.provider, fix.patch, fix.explanation),
                )
            connection.commit()

    def save_review(self, review: ReviewSnapshot, comments: list[ReviewCommentSnapshot]) -> None:
        self._ensure_schema()
        self._ensure_project_and_repository(review.project_id, review.repository_id)
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    insert into reviews (id, project_id, repository_id, source, target_label, score, severity, summary, provider)
                    values (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        review.review_id,
                        review.project_id,
                        review.repository_id,
                        review.source,
                        review.target_label,
                        review.score,
                        review.severity,
                        review.summary,
                        review.provider,
                    ),
                )
                for comment in comments:
                    cursor.execute(
                        """
                        insert into review_comments (review_id, path, line, severity, message, suggestion)
                        values (%s, %s, %s, %s, %s, %s)
                        """,
                        (
                            comment.review_id,
                            comment.path,
                            comment.line,
                            comment.severity,
                            comment.message,
                            comment.suggestion,
                        ),
                    )
            connection.commit()

    def latest_project_score(self, project_id: str) -> tuple[int, str] | None:
        self._ensure_schema()
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    select score, max_severity
                    from scans
                    where project_id = %s
                    order by created_at desc
                    limit 1
                    """,
                    (project_id,),
                )
                row = cursor.fetchone()
        if row is None:
            return None
        return int(row[0]), str(row[1])

    def list_project_scans(self, project_id: str, limit: int = 10) -> list[ScanSnapshot]:
        self._ensure_schema()
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    select id, project_id, repository_id, score, max_severity, scan_type, created_at
                    from scans
                    where project_id = %s
                    order by created_at desc
                    limit %s
                    """,
                    (project_id, limit),
                )
                rows = cursor.fetchall()
        return [
            ScanSnapshot(
                scan_id=str(row[0]),
                project_id=str(row[1]),
                repository_id=str(row[2]),
                score=int(row[3]),
                max_severity=str(row[4]),
                scan_type=str(row[5]),
                created_at=row[6].isoformat() if hasattr(row[6], "isoformat") else str(row[6]),
            )
            for row in rows
        ]

    def latest_review(self, project_id: str) -> tuple[ReviewSnapshot, list[ReviewCommentSnapshot]] | None:
        self._ensure_schema()
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    select id, project_id, repository_id, source, target_label, score, severity, summary, provider
                    from reviews
                    where project_id = %s
                    order by created_at desc
                    limit 1
                    """,
                    (project_id,),
                )
                review_row = cursor.fetchone()
                if review_row is None:
                    return None

                review = ReviewSnapshot(
                    review_id=str(review_row[0]),
                    project_id=str(review_row[1]),
                    repository_id=str(review_row[2]),
                    source=str(review_row[3]),
                    target_label=str(review_row[4]),
                    score=int(review_row[5]),
                    severity=str(review_row[6]),
                    summary=str(review_row[7]),
                    provider=str(review_row[8]),
                )
                cursor.execute(
                    """
                    select path, line, severity, message, suggestion
                    from review_comments
                    where review_id = %s
                    order by id asc
                    """,
                    (review.review_id,),
                )
                comment_rows = cursor.fetchall()

        comments = [
            ReviewCommentSnapshot(
                review_id=review.review_id,
                path=str(row[0]),
                line=int(row[1]),
                severity=str(row[2]),
                message=str(row[3]),
                suggestion=str(row[4]) if row[4] is not None else None,
            )
            for row in comment_rows
        ]
        return review, comments

    def save_telemetry(self, event: TelemetrySnapshot) -> None:
        self._ensure_schema()
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    insert into telemetry_events (event_id, anonymous_id, event_name, source, properties, created_at)
                    values (%s, %s, %s, %s, %s::jsonb, %s)
                    """,
                    (
                        event.event_id,
                        event.anonymous_id,
                        event.event_name,
                        event.source,
                        json.dumps(event.properties),
                        event.created_at,
                    ),
                )
            connection.commit()

    def telemetry_summary(self) -> dict[str, int]:
        self._ensure_schema()
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    select event_name, count(*)
                    from telemetry_events
                    group by event_name
                    """
                )
                rows = cursor.fetchall()

        counts = {str(row[0]): int(row[1]) for row in rows}
        return {
            "workspace_scans": counts.get("scan_completed", 0) + counts.get("workspace_scan", 0),
            "fixes_applied": counts.get("fix_applied", 0),
            "reviews_generated": counts.get("review_completed", 0) + counts.get("review_generated", 0),
            "reviews_published": counts.get("review_published", 0),
        }

    def count_findings(self, project_id: str, scanner: str | None = None) -> int:
        self._ensure_schema()
        query = "select count(*) from findings where project_id = %s"
        params: list[object] = [project_id]
        if scanner is not None:
            query += " and scanner = %s"
            params.append(scanner)
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(query, tuple(params))
                row = cursor.fetchone()
        return int(row[0]) if row else 0

    def find_finding_by_id(self, finding_id: str) -> FindingRecord | None:
        self._ensure_schema()
        with self._connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    select id, project_id, repository_id, scanner, rule_id, title, description, severity,
                           file_path, line_start, line_end, fingerprint, created_at
                    from findings
                    where id = %s
                    limit 1
                    """,
                    (finding_id,),
                )
                row = cursor.fetchone()
        if row is None:
            return None
        return FindingRecord(
            id=str(row[0]),
            project_id=str(row[1]),
            repository_id=str(row[2]),
            scanner=str(row[3]),
            rule_id=str(row[4]),
            title=str(row[5]),
            description=str(row[6]),
            severity=str(row[7]),
            file_path=str(row[8]),
            line_start=row[9],
            line_end=row[10],
            fingerprint=str(row[11]),
            created_at=str(row[12]),
        )


def get_security_store() -> SecurityStore:
    if settings.database_url.startswith("postgresql"):
        try:
            import psycopg  # noqa: F401

            return PostgresSecurityStore(settings.database_url)
        except Exception:
            return MemorySecurityStore()
    return MemorySecurityStore()


security_store: SecurityStore = get_security_store()


def new_scan_snapshot(
    project_id: str,
    repository_id: str,
    score: int,
    max_severity: str,
    scan_type: str,
) -> ScanSnapshot:
    created_at = datetime.now(timezone.utc).isoformat()
    return ScanSnapshot(
        scan_id=str(uuid4()),
        project_id=project_id,
        repository_id=repository_id,
        score=score,
        max_severity=max_severity,
        scan_type=scan_type,
        created_at=created_at,
    )


def new_review_snapshot(
    project_id: str,
    repository_id: str,
    source: str,
    target_label: str,
    score: int,
    severity: str,
    summary: str,
    provider: str,
) -> ReviewSnapshot:
    return ReviewSnapshot(
        review_id=str(uuid4()),
        project_id=project_id,
        repository_id=repository_id,
        source=source,
        target_label=target_label,
        score=score,
        severity=severity,
        summary=summary,
        provider=provider,
    )


def new_telemetry_snapshot(
    anonymous_id: str,
    event_name: str,
    source: str | None,
    properties: dict[str, str | int | bool | None],
) -> TelemetrySnapshot:
    return TelemetrySnapshot(
        event_id=str(uuid4()),
        anonymous_id=anonymous_id,
        event_name=event_name,
        source=source,
        properties=properties,
        created_at=datetime.now(timezone.utc).isoformat(),
    )
