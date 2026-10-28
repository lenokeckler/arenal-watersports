export const WORKER_ACCOUNT_ACTION = {
  BLOCK: "block",
  UNLOCK: "unlock",
} as const;

export type WorkerAccountAction =
  (typeof WORKER_ACCOUNT_ACTION)[keyof typeof WORKER_ACCOUNT_ACTION];

export const WORKER_ACCOUNT_RESULT = {
  ADMIN_ACCOUNT: "admin_account",
  BLOCKED: "blocked",
  FAILED: "failed",
  NOT_ALLOWED: "not_allowed",
  HAS_PERSONAL_EMAIL: "has_personal_email",
  NOT_FOUND: "not_found",
  READY: "ready",
  RETIRED: "retired",
  UNLOCKED: "unlocked",
} as const;

export type WorkerAccountResult =
  (typeof WORKER_ACCOUNT_RESULT)[keyof typeof WORKER_ACCOUNT_RESULT];

export const WORKER_ACCOUNT_FIELD = {
  ACCOUNT_NOTICE: "accountNotice",
  ACTION: "action",
} as const;

export const WORKER_ACCOUNT_STATE = {
  ACTIVE: "active",
  BLOCKED_BY_ADMINISTRATION: "blocked_administration",
  BLOCKED_BY_ATTEMPTS: "blocked_attempts",
  RETIRED: "retired",
} as const;

export type WorkerAccountState =
  (typeof WORKER_ACCOUNT_STATE)[keyof typeof WORKER_ACCOUNT_STATE];
