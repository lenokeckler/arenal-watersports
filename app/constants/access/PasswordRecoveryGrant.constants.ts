import { PATHS } from "../strings/Paths.constants";

export const PASSWORD_RECOVERY_GRANT = {
  COOKIE_NAME: "arenal-recovery-grant",
  MAX_AGE_SECONDS: 600,
  PATTERN: /^[0-9a-f]{64}$/,
} as const;

export const PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: PASSWORD_RECOVERY_GRANT.MAX_AGE_SECONDS,
  path: PATHS.ACCESS.RECOVERY,
  sameSite: "strict",
  secure: true,
} as const;
