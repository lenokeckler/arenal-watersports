export const SUPABASE_WORKER_COLUMN = {
  BLOCKED_REASON: "blocked_reason",
  SIGNED_IN_WORKER:
    "username, must_change_password, base_role",
  AREA: "area",
  ID: "id",
  USERNAME: "username",
  WORKER_AREAS_OVERVIEW:
    "id, username, full_name, base_role, is_external_guide",
  WORKER_ID: "worker_id",
  PERSONAL_EMAIL: "personal_email",
  PERSONAL_EMAIL_STATE: "personal_email, base_role",
} as const;
