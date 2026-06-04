type LogLevel = "debug" | "info" | "warn" | "error";

function log(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  const payload = meta ? ` ${JSON.stringify(meta)}` : "";
  // eslint-disable-next-line no-console
  console[level](`[goaegis] ${message}${payload}`);
}

export const logger = {
  debug(message: string, meta?: Record<string, unknown>) {
    log("debug", message, meta);
  },
  info(message: string, meta?: Record<string, unknown>) {
    log("info", message, meta);
  },
  warn(message: string, meta?: Record<string, unknown>) {
    log("warn", message, meta);
  },
  error(message: string, meta?: Record<string, unknown>) {
    log("error", message, meta);
  }
};

