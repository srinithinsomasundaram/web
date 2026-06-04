export interface Policy {
  blockCritical: boolean;
  blockSecrets: boolean;
  minimumScore?: number;
}

export interface PolicyValidationResult {
  allowed: boolean;
  reasons: string[];
}

