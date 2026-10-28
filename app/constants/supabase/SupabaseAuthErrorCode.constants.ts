export const SUPABASE_AUTH_ERROR_CODE = {
  HOOK_REJECTION: "unknown",
  INVALID_CREDENTIALS: "invalid_credentials",
  OVER_REQUEST_RATE_LIMIT: "over_request_rate_limit",
  SAME_PASSWORD: "same_password",
  VALIDATION_FAILED: "validation_failed",
  WEAK_PASSWORD: "weak_password",
} as const;
