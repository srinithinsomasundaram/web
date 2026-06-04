import type { Policy } from "@goaegis/shared-types";

export const defaultPolicy: Policy = {
  blockCritical: true,
  blockSecrets: true,
  minimumScore: 80
};

