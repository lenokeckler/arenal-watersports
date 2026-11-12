export const RESERVATION_GUIDE_QUERY = {
  ACTIVE_STATUS_COLUMN: "status",
  DELETED_AT_COLUMN: "deleted_at",
  EXPIRATION_COLUMN: "expires_at",
  EXPIRATION_FILTER_COLUMN: "or",
  GUIDE_MARK: "guia",
  GUIDE_MARK_COLUMN: "worker_marks.mark",
} as const;
