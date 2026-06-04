from __future__ import annotations

import json
import logging
from typing import Optional
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from app.config.settings import settings
from app.services.security_engine import FindingRecord

logger = logging.getLogger(__name__)

SEVERITY_ORDER = {"low": 0, "medium": 1, "high": 2, "critical": 3}
GEMINI_MODEL = "gemini-2.5-flash"


def _normalize_provider(provider: str | None) -> str:
    normalized = provider.strip().lower() if provider else "gemini"
    if normalized not in {"gemini", "openai", "anthropic"}:
        return "gemini"
    return normalized


def _extract_model_text(response_data: dict[str, object]) -> str:
    candidates = response_data.get("candidates")
    if not isinstance(candidates, list) or not candidates:
        raise RuntimeError("Gemini returned no candidates.")

    first_candidate = candidates[0]
    if not isinstance(first_candidate, dict):
        raise RuntimeError("Gemini returned an invalid candidate.")

    content = first_candidate.get("content")
    if not isinstance(content, dict):
        raise RuntimeError("Gemini returned an invalid content payload.")

    parts = content.get("parts")
    if not isinstance(parts, list):
        raise RuntimeError("Gemini returned no content parts.")

    for part in parts:
        if isinstance(part, dict) and isinstance(part.get("text"), str) and part["text"].strip():
            return part["text"]

    raise RuntimeError("Gemini returned no text content.")


def _call_gemini(prompt: str, schema: dict[str, object]) -> dict[str, object]:
    if not settings.gemini_api_key:
        raise RuntimeError("Gemini API key is not configured.")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}],
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseJsonSchema": schema,
        },
    }
    request = Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": settings.gemini_api_key,
            "User-Agent": "GoAegis/1.0",
        },
        method="POST",
    )

    try:
        with urlopen(request, timeout=30) as response:
            response_data = json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        raise RuntimeError(exc.read().decode("utf-8") or exc.reason) from exc
    except URLError as exc:
        raise RuntimeError(str(exc.reason)) from exc

    text = _extract_model_text(response_data)
    parsed = json.loads(text)
    if not isinstance(parsed, dict):
        raise RuntimeError("Gemini returned an invalid structured response.")
    return parsed


def _gemini_fix_prompt(finding: FindingRecord) -> str:
    return (
        "You are GoAegis, a security remediation engine. "
        "Return a JSON object with keys patch and explanation. "
        "Fix the vulnerability in the target file with the smallest safe change. "
        "Do not include markdown fences.\n\n"
        f"Title: {finding.title}\n"
        f"Description: {finding.description}\n"
        f"Severity: {finding.severity}\n"
        f"File: {finding.file_path}\n"
        f"Rule: {finding.rule_id}\n"
    )


def _gemini_review_prompt(
    findings: list[FindingRecord],
    target_label: str,
    path: str | None,
    content: str | None,
    diff: str | None,
) -> str:
    finding_lines = [
        f"- {finding.severity.upper()} | {finding.file_path}:{finding.line_start or 1} | {finding.title} | {finding.description}"
        for finding in findings
    ]
    return (
        "You are GoAegis, a security review engine. "
        "Return JSON with keys summary, top_risks, recommended_improvements, architecture_concerns, comments, provider. "
        "Each comment must include path, line, severity, message, and optional suggestion. "
        "Use only the provided information.\n\n"
        f"Target: {target_label}\n"
        f"Path: {path or target_label}\n"
        f"Findings:\n{chr(10).join(finding_lines) if finding_lines else '- none'}\n\n"
        f"Content:\n{content or ''}\n\n"
        f"Diff:\n{diff or ''}\n"
    )


def generate_fix(provider: str, finding: Optional[FindingRecord]) -> tuple[str, str]:
    normalized = _normalize_provider(provider)

    if finding is None:
        patch = "/* GoAegis could not identify the finding. Review manually. */"
        return patch, f"Generated fallback guidance using {normalized}."

    if normalized == "gemini" and settings.gemini_api_key:
        try:
            response = _call_gemini(
                _gemini_fix_prompt(finding),
                {
                    "type": "object",
                    "properties": {
                        "patch": {"type": "string"},
                        "explanation": {"type": "string"},
                    },
                    "required": ["patch", "explanation"],
                    "additionalProperties": False,
                },
            )
            patch = str(response.get("patch") or "").strip()
            explanation = str(response.get("explanation") or "").strip()
            if patch and explanation:
                logger.info("Gemini generated fix for %s", finding.id)
                return patch, explanation
        except Exception as exc:
            logger.warning("Gemini fix generation failed; falling back to heuristics: %s", exc)

    title = finding.title.lower()
    description = finding.description.lower()
    file_path = finding.file_path.lower()

    if "sql injection" in title or "sql injection" in description:
        if file_path.endswith(".py"):
            patch = (
                'query = "SELECT * FROM users WHERE id=%s"\n'
                'cursor.execute(query, (user_id,))'
            )
        else:
            patch = (
                'const query = "SELECT * FROM users WHERE id=?";\n'
                "db.query(query, [userId]);"
            )
        return patch, f"Generated parameterized query remediation using {normalized}."

    if "eval" in title or "eval" in description:
        if file_path.endswith(".js") or file_path.endswith(".ts"):
            patch = "// validate input and replace eval with a safe parser"
        else:
            patch = "# validate input and replace eval with a safe parser"
        return patch, f"Generated eval removal remediation using {normalized}."

    if "hardcoded secret" in title or "secret" in title or "secret" in description:
        patch = "/* move secret to environment configuration */"
        return patch, f"Generated secret-handling remediation using {normalized}."

    patch = "/* GoAegis remediation generated by the AI provider */"
    return patch, f"Generated generic remediation using {normalized}."


def _review_suggestion_for_finding(finding: FindingRecord) -> str:
    title = finding.title.lower()
    description = finding.description.lower()
    file_path = finding.file_path.lower()

    if "sql injection" in title or "sql injection" in description:
        if file_path.endswith(".py"):
            return "Use a parameterized query and pass user input as a bound parameter."
        return "Replace string interpolation with a parameterized query or ORM binding."

    if "eval" in title or "eval" in description:
        return "Remove dynamic execution and replace it with explicit parsing or validated dispatch."

    if "secret" in title or "token" in title or "credential" in title:
        return "Move the secret into environment-backed configuration or a secrets manager."

    return "Refactor the unsafe pattern before merging this change."


def generate_review(
    provider: str,
    findings: list[FindingRecord],
    target_label: str,
    path: str | None,
    content: str | None,
    diff: str | None,
) -> dict[str, object]:
    normalized = _normalize_provider(provider)

    if normalized == "gemini" and settings.gemini_api_key:
        try:
            response = _call_gemini(
                _gemini_review_prompt(findings, target_label, path, content, diff),
                {
                    "type": "object",
                    "properties": {
                        "provider": {"type": "string"},
                        "summary": {"type": "string"},
                        "top_risks": {"type": "array", "items": {"type": "string"}},
                        "recommended_improvements": {"type": "array", "items": {"type": "string"}},
                        "architecture_concerns": {"type": "array", "items": {"type": "string"}},
                        "comments": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "path": {"type": "string"},
                                    "line": {"type": "integer"},
                                    "severity": {"type": "string"},
                                    "message": {"type": "string"},
                                    "suggestion": {"type": ["string", "null"]},
                                },
                                "required": ["path", "line", "severity", "message"],
                                "additionalProperties": False,
                            },
                        },
                    },
                    "required": [
                        "provider",
                        "summary",
                        "top_risks",
                        "recommended_improvements",
                        "architecture_concerns",
                        "comments",
                    ],
                    "additionalProperties": False,
                },
            )
            top_risks = [str(item) for item in response.get("top_risks", []) if isinstance(item, str)]
            recommended_improvements = [
                str(item) for item in response.get("recommended_improvements", []) if isinstance(item, str)
            ]
            architecture_concerns = [
                str(item) for item in response.get("architecture_concerns", []) if isinstance(item, str)
            ]
            comments = response.get("comments", [])
            if isinstance(comments, list) and isinstance(response.get("summary"), str):
                logger.info("Gemini generated review for %s", target_label)
                return {
                    "provider": str(response.get("provider") or normalized),
                    "summary": str(response["summary"]),
                    "top_risks": top_risks,
                    "recommended_improvements": recommended_improvements,
                    "architecture_concerns": architecture_concerns,
                    "comments": comments,
                }
        except Exception as exc:
            logger.warning("Gemini review generation failed; falling back to heuristics: %s", exc)

    sorted_findings = sorted(findings, key=lambda finding: SEVERITY_ORDER.get(finding.severity, 1), reverse=True)
    review_comments: list[dict[str, object]] = []
    top_risks: list[str] = []
    recommended_improvements: list[str] = []
    architecture_concerns: list[str] = []

    for finding in sorted_findings:
        line_number = finding.line_start or 1
        review_comments.append(
            {
                "path": finding.file_path,
                "line": line_number,
                "severity": finding.severity,
                "message": f"{finding.title}: {finding.description}",
                "suggestion": _review_suggestion_for_finding(finding),
            }
        )
        if finding.severity in {"critical", "high"} and finding.title not in top_risks:
            top_risks.append(f"{finding.severity.title()}: {finding.title}")
        if finding.title not in recommended_improvements:
            recommended_improvements.append(
                f"Address {finding.title.lower()} in {finding.file_path}:{finding.line_start or 1} before merge."
            )

    review_text = "\n".join(part for part in [content or "", diff or ""] if part).strip()
    if review_text:
        for index, raw_line in enumerate(review_text.splitlines(), start=1):
            lowered = raw_line.lower()
            stripped = raw_line.strip()
            if not stripped:
                continue

            if "eval(" in lowered or "exec(" in lowered:
                review_comments.append(
                    {
                        "path": path or target_label,
                        "line": index,
                        "severity": "high",
                        "message": "Dynamic execution is unsafe in review context.",
                        "suggestion": "Replace dynamic execution with explicit parsing or a safe dispatcher.",
                    }
                )
                if "Dynamic execution is unsafe" not in top_risks:
                    top_risks.append("High: dynamic execution found in the reviewed code.")

            if ("select " in lowered and " from " in lowered) and ("{" in raw_line or "+" in raw_line or "%" in raw_line):
                review_comments.append(
                    {
                        "path": path or target_label,
                        "line": index,
                        "severity": "high",
                        "message": "Potential SQL injection pattern detected.",
                        "suggestion": "Parameterize the query instead of concatenating user input.",
                    }
                )

            if any(token in lowered for token in ("password", "secret", "token", "api_key")) and "=" in raw_line:
                review_comments.append(
                    {
                        "path": path or target_label,
                        "line": index,
                        "severity": "high",
                        "message": "Potential hardcoded secret detected.",
                        "suggestion": "Read credentials from environment-backed configuration or a secrets manager.",
                    }
                )

            if "todo" in lowered or "fixme" in lowered:
                architecture_concerns.append(f"Resolve the TODO/FIXME marker at line {index} before merging.")

    if not top_risks:
        top_risks.append("No critical security risks were identified in the current review target.")
    if not recommended_improvements:
        recommended_improvements.append("Keep validation close to the boundary and keep data flow explicit.")
    if not architecture_concerns:
        architecture_concerns.append("Check module boundaries and keep high-risk logic isolated from the UI layer.")

    summary = f"Generated {len(review_comments)} review comment(s) using {normalized}."
    return {
        "provider": normalized,
        "summary": summary,
        "top_risks": top_risks[:3],
        "recommended_improvements": recommended_improvements[:3],
        "architecture_concerns": architecture_concerns[:3],
        "comments": review_comments,
    }
