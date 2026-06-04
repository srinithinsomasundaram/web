#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="$ROOT_DIR/apps/api"
VENV_ACTIVATE="$API_DIR/.venv/bin/activate"
HOST="${GOAEGIS_API_HOST:-127.0.0.1}"
PORT="${GOAEGIS_API_PORT:-8000}"
HEALTH_URL="http://${HOST}:${PORT}/health"
LOG_FILE="${GOAEGIS_API_LOG_FILE:-/tmp/goaegis-api.log}"
PID_FILE="${GOAEGIS_API_PID_FILE:-/tmp/goaegis-api.pid}"

if [ ! -f "$VENV_ACTIVATE" ]; then
  echo "Missing Python virtual environment at $VENV_ACTIVATE" >&2
  echo "Create it with:" >&2
  echo "  cd apps/api && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt" >&2
  exit 1
fi

if ! command -v semgrep >/dev/null 2>&1; then
  echo "Missing required scanner: semgrep" >&2
  echo "Install semgrep before running GoAegis scans." >&2
  exit 1
fi

if ! command -v gitleaks >/dev/null 2>&1; then
  echo "Missing required scanner: gitleaks" >&2
  echo "Install gitleaks before running GoAegis scans." >&2
  exit 1
fi

echo "GOAEGIS_BACKEND_STARTING"

source "$VENV_ACTIVATE"

mkdir -p "$(dirname "$LOG_FILE")"

if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  existing_pid="$(cat "$PID_FILE")"
  echo "GoAegis API already running on ${HEALTH_URL} (pid ${existing_pid})."
else
  : > "$LOG_FILE"
  (
    cd "$API_DIR"
    exec uvicorn app.main:app --host "$HOST" --port "$PORT" >>"$LOG_FILE" 2>&1
  ) &
  api_pid=$!
  echo "$api_pid" > "$PID_FILE"

  ready=0
  for _ in $(seq 1 30); do
    if curl -fsS "$HEALTH_URL" >/dev/null 2>&1; then
      ready=1
      break
    fi
    if ! kill -0 "$api_pid" 2>/dev/null; then
      wait "$api_pid" || true
      echo "GoAegis API exited before becoming ready. See $LOG_FILE" >&2
      exit 1
    fi
    sleep 1
  done

  if [ "$ready" -ne 1 ]; then
    echo "Timed out waiting for GoAegis API at $HEALTH_URL. See $LOG_FILE" >&2
    exit 1
  fi

  echo "GoAegis API started on ${HEALTH_URL} (pid ${api_pid})."
fi

echo "GOAEGIS_BACKEND_READY"
