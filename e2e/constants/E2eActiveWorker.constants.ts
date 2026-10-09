export const E2E_ACTIVE_WORKER = {
  PASSWORD: "Vigente.2026!",
} as const;

export const E2E_ACTIVE_WORKER_ATTEMPTS = {
  JUST_BELOW_LOCK: 9,
  LOCKED: 10,
  NONE: 0,
  ONE_FAILURE: 1,
} as const;

export const E2E_OPEN_SESSIONS = {
  AFTER_CHANGE: 1,
  BEFORE_CHANGE: 2,
} as const;
