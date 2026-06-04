from __future__ import annotations

from types import SimpleNamespace
import unittest
from unittest.mock import MagicMock, patch

from app.schemas.secrets import SecretScanRequest
from app.schemas.telemetry import TelemetrySummaryResponse
from app.services.score_service import get_project_score
from app.services.secrets_service import scan_secrets
from app.services.telemetry_service import get_telemetry_summary


class ContractTests(unittest.TestCase):
    def test_secret_scan_uses_real_score(self) -> None:
        finding = SimpleNamespace(id="f-1", severity="critical")

        with patch("app.services.secrets_service.run_secret_scan", return_value=[finding]), patch(
            "app.services.secrets_service.calculate_security_score",
            return_value=41,
        ) as calculate_security_score, patch(
            "app.services.secrets_service.max_severity",
            return_value="critical",
        ) as max_severity, patch("app.services.secrets_service.security_store") as security_store:
            response = scan_secrets(SecretScanRequest(projectId="project-1"))

        self.assertEqual(response.project_id, "project-1")
        self.assertEqual(response.total_secrets, 1)
        calculate_security_score.assert_called_once()
        max_severity.assert_called_once()
        security_store.save_scan.assert_called_once()
        scan_snapshot = security_store.save_scan.call_args.args[0]
        self.assertEqual(scan_snapshot.score, 41)
        self.assertEqual(scan_snapshot.max_severity, "critical")

    def test_project_score_fallback_is_read_only(self) -> None:
        with patch("app.services.score_service.security_store") as security_store:
            security_store.latest_project_score.return_value = None
            response = get_project_score("project-1")

        self.assertEqual(response.project_id, "project-1")
        self.assertEqual(response.score, 100)
        self.assertEqual(response.severity, "low")
        security_store.save_scan.assert_not_called()

    def test_telemetry_summary_maps_event_counts(self) -> None:
        with patch("app.services.telemetry_service.security_store") as security_store:
            security_store.telemetry_summary.return_value = {
                "workspace_scans": 7,
                "fixes_applied": 3,
                "reviews_generated": 5,
                "reviews_published": 2,
            }
            response = get_telemetry_summary()

        self.assertIsInstance(response, TelemetrySummaryResponse)
        self.assertEqual(response.workspace_scans, 7)
        self.assertEqual(response.fixes_applied, 3)
        self.assertEqual(response.reviews_generated, 5)
        self.assertEqual(response.reviews_published, 2)
