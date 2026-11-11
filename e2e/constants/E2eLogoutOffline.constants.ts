import { SIGN_OUT } from "@/app/constants";

export const E2E_LOGOUT_OFFLINE = {
  PAST_EXPIRY_MS: 60_000,
  FALLBACK_DUE_MS: SIGN_OUT.TIME_LIMIT_MS,
} as const;
