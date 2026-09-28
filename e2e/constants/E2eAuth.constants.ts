export const E2E_COOKIE_SAME_SITE = {
  LAX: "Lax",
  NONE: "None",
  STRICT: "Strict",
} as const;

export type E2ePlaywrightSameSite =
  (typeof E2E_COOKIE_SAME_SITE)[keyof typeof E2E_COOKIE_SAME_SITE];

export const E2E_COOKIE_DEFAULT_MAX_AGE_SECONDS = 3_600;
