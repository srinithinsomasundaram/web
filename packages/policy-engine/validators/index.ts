import type { Policy, PolicyValidationResult } from "@goaegis/shared-types";

export interface PolicyContext {
  score: number;
  hasCriticalFindings: boolean;
  hasSecrets: boolean;
}

export function validatePolicy(policy: Policy, context: PolicyContext): PolicyValidationResult {
  const reasons: string[] = [];

  if (policy.blockCritical && context.hasCriticalFindings) {
    reasons.push("Critical findings are blocked by policy.");
  }

  if (policy.blockSecrets && context.hasSecrets) {
    reasons.push("Secrets are blocked by policy.");
  }

  if (typeof policy.minimumScore === "number" && context.score < policy.minimumScore) {
    reasons.push(`Score must be at least ${policy.minimumScore}.`);
  }

  return {
    allowed: reasons.length === 0,
    reasons
  };
}

