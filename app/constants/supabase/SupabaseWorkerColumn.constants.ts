export const SUPABASE_WORKER_COLUMN = {
  AREA: "area",
  BLOCKED_REASON: "blocked_reason",
  ID: "id",
  MARK: "mark",
  PERSONAL_EMAIL: "personal_email",
  PERSONAL_EMAIL_STATE: "personal_email, base_role",
  RESERVATION_CALENDAR_PAGE_SIZE:
    "reservation_calendar_page_size",
  SIGNED_IN_WORKER:
    "username, must_change_password, base_role",
  USERNAME: "username",
  WORKER_AREAS_OVERVIEW:
    "id, username, full_name, base_role, is_external_guide, status, blocked_reason, deleted_at, personal_email, expires_at",
  WORKER_ID: "worker_id",
} as const;
