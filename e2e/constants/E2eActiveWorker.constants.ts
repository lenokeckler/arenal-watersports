import { E2E_COUNT } from "./E2eRuntime.constants";

export const E2E_ACTIVE_WORKER = {
  PASSWORD: "Vigente.2026!",
} as const;

export const E2E_ACTIVE_WORKER_ATTEMPTS = {
  JUST_BELOW_LOCK: 9,
  LOCKED: 10,
  NONE: E2E_COUNT.NONE,
  ONE_FAILURE: 1,
} as const;

export const E2E_OPEN_SESSIONS = {
  AFTER_BLOCK: 0,
  AFTER_CHANGE: 1,
  BEFORE_CHANGE: 2,
} as const;
