from __future__ import annotations

import json
import os
import subprocess
import tempfile
from datetime import datetime, timezone
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote, urlparse


SEVERITY_ORDER = {"low": 0, "medium": 1, "high": 2, "critical": 3}


@dataclass(slots=True)
class FindingRecord:
    id: str
    project_id: str
    repository_id: str
    scanner: str
    rule_id: str
    title: str
    description: str
    severity: str
    file_path: str
    line_start: int | None
    line_end: int | None
    fingerprint: str
    created_at: str


def _resolve_target_path(raw_path: str | None) -> Path:
    candidate = raw_path or os.environ.get("GOAEGIS_REPOSITORY_PATH") or "."
    if candidate.startswith("file://"):
        parsed = urlparse(candidate)
        return Path(unquote(parsed.path))
    return Path(candidate).expanduser().resolve()


def _run_command(command: list[str], cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
    try:
        return subprocess.run(
            command,
            cwd=str(cwd) if cwd else None,
            check=False,
            capture_output=True,
            text=True,
        )
    except FileNotFoundError as exc:
        raise RuntimeError(f"Required scanner is not installed: {command[0]}") from exc


def _read_json(path: Path) -> object:
    return json.loads(path.read_text(encoding="utf-8"))


def _build_fingerprint(parts: list[str | int | None]) -> str:
    return ":".join(str(part) for part in parts if part not in (None, ""))


def _normalize_semgrep_severity(value: str | None) -> str:
    mapping = {
        "info": "low",
        "warning": "medium",
        "error": "high",
        "critical": "critical",
    }
    return mapping.get((value or "").lower(), "medium")


def _normalize_gitleaks_severity(tags: list[str] | None) -> str:
    normalized = [tag.lower() for tag in tags or []]
    if any("critical" in tag for tag in normalized):
        return "critical"
    if any("high" in tag for tag in normalized):
        return "high"
    if any("medium" in tag for tag in normalized):
        return "medium"
    return "high"


def _semgrep_findings(project_id: str, repository_id: str, target_path: Path) -> list[FindingRecord]:
    now = datetime.now(timezone.utc).isoformat()
    with tempfile.TemporaryDirectory(prefix="goaegis-semgrep-") as temp_dir:
        report_path = Path(temp_dir) / "semgrep.json"
        result = _run_command(
            [
                "semgrep",
                "scan",
                "--json",
                "--quiet",
                "--config",
                "auto",
                "--json-output",
                str(report_path),
                str(target_path),
            ],
            cwd=target_path if target_path.is_dir() else target_path.parent,
        )

        if result.returncode not in (0, 1):
            message = result.stderr.strip() or result.stdout.strip() or f"semgrep exited with {result.returncode}"
            raise RuntimeError(message)

        report = _read_json(report_path)
        results = report.get("results", []) if isinstance(report, dict) else []
        findings: list[FindingRecord] = []

        for result_item in results:
            if not isinstance(result_item, dict):
                continue

            extra = result_item.get("extra") or {}
            start = result_item.get("start") or {}
            end = result_item.get("end") or {}
            line_start = start.get("line") if isinstance(start, dict) else None
            line_end = end.get("line") if isinstance(end, dict) else line_start
            fingerprint = (
                extra.get("fingerprint")
                if isinstance(extra, dict)
                else None
            ) or _build_fingerprint(
                [
                    "semgrep",
                    result_item.get("check_id"),
                    result_item.get("path"),
                    line_start,
                    line_end,
                ]
            )
            message = extra.get("message") if isinstance(extra, dict) else None
            findings.append(
                FindingRecord(
                    id=f"semgrep:{fingerprint}",
                    project_id=project_id,
                    repository_id=repository_id,
                    scanner="semgrep",
                    rule_id=str(result_item.get("check_id") or "semgrep-rule"),
                    title=str(message or result_item.get("check_id") or "Semgrep finding"),
                    description=str(message or result_item.get("check_id") or "Semgrep finding"),
                    severity=_normalize_semgrep_severity(extra.get("severity") if isinstance(extra, dict) else None),
                    file_path=str(result_item.get("path") or ""),
                    line_start=line_start,
                    line_end=line_end,
                    fingerprint=fingerprint,
                    created_at=now,
                )
            )

        return findings


def _gitleaks_findings(project_id: str, repository_id: str, target_path: Path) -> list[FindingRecord]:
    now = datetime.now(timezone.utc).isoformat()
    with tempfile.TemporaryDirectory(prefix="goaegis-gitleaks-") as temp_dir:
        report_path = Path(temp_dir) / "gitleaks.json"
        result = _run_command(
            [
                "gitleaks",
                "dir",
                "--report-format",
                "json",
                "--report-path",
                str(report_path),
                str(target_path),
            ],
            cwd=target_path if target_path.is_dir() else target_path.parent,
        )

        if result.returncode not in (0, 1):
            message = result.stderr.strip() or result.stdout.strip() or f"gitleaks exited with {result.returncode}"
            raise RuntimeError(message)

        report = _read_json(report_path)
        if not isinstance(report, list):
            return []

        findings: list[FindingRecord] = []
        for result_item in report:
            if not isinstance(result_item, dict):
                continue

            line_start = result_item.get("StartLine")
            line_end = result_item.get("EndLine") or line_start
            fingerprint = result_item.get("Fingerprint") or _build_fingerprint(
                [
                    "gitleaks",
                    result_item.get("RuleID"),
                    result_item.get("File"),
                    line_start,
                    line_end,
                ]
            )
            findings.append(
                FindingRecord(
                    id=f"gitleaks:{fingerprint}",
                    project_id=project_id,
                    repository_id=repository_id,
                    scanner="gitleaks",
                    rule_id=str(result_item.get("RuleID") or "gitleaks-rule"),
                    title=str(result_item.get("Description") or result_item.get("RuleID") or "Secret detected"),
                    description=str(result_item.get("Description") or "Secret detected"),
                    severity=_normalize_gitleaks_severity(result_item.get("Tags") if isinstance(result_item.get("Tags"), list) else None),
                    file_path=str(result_item.get("File") or ""),
                    line_start=line_start if isinstance(line_start, int) else None,
                    line_end=line_end if isinstance(line_end, int) else None,
                    fingerprint=str(fingerprint),
                    created_at=now,
                )
            )

        return findings


def run_security_scan(project_id: str, repository_id: str, raw_path: str | None = None) -> list[FindingRecord]:
    target_path = _resolve_target_path(raw_path)
    findings = _semgrep_findings(project_id, repository_id, target_path)
    findings.extend(_gitleaks_findings(project_id, repository_id, target_path))
    return findings


def run_secret_scan(project_id: str, repository_id: str, raw_path: str | None = None) -> list[FindingRecord]:
    target_path = _resolve_target_path(raw_path)
    return _gitleaks_findings(project_id, repository_id, target_path)


def calculate_security_score(findings: list[FindingRecord]) -> int:
    penalty = sum(
        {
            "low": 5,
            "medium": 15,
            "high": 30,
            "critical": 60,
        }.get(finding.severity, 15)
        for finding in findings
    )
    return max(0, 100 - penalty)


def max_severity(findings: list[FindingRecord]) -> str:
    if not findings:
        return "low"
    return max(findings, key=lambda finding: SEVERITY_ORDER.get(finding.severity, 1)).severity


def to_public_finding(record: FindingRecord) -> dict[str, object]:
    created_at = record.created_at or ""
    if not created_at:
        created_at = "" if not record.fingerprint else datetime.now(timezone.utc).isoformat()

    return {
        "id": record.id,
        "projectId": record.project_id,
        "repositoryId": record.repository_id,
        "scanner": record.scanner,
        "ruleId": record.rule_id,
        "title": record.title,
        "description": record.description,
        "severity": record.severity,
        "filePath": record.file_path,
        "lineStart": record.line_start,
        "lineEnd": record.line_end,
        "fingerprint": record.fingerprint,
        "createdAt": created_at,
    }
