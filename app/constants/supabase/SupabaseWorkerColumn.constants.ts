export const SUPABASE_WORKER_COLUMN = {
  BLOCKED_REASON: "blocked_reason",
  SIGNED_IN_WORKER:
    "username, must_change_password, base_role",
  ID: "id",
  PERSONAL_EMAIL: "personal_email",
  PERSONAL_EMAIL_STATE: "personal_email, base_role",
} as const;
