export const SUPABASE_RPC = {
  BLOCK_WORKER: "block_worker",
  CHOOSE_WORK_AREA: "choose_work_area",
  COMPLETE_FIRST_PASSWORD_CHANGE:
    "complete_first_password_change",
  CONSUME_PASSWORD_RESET_PIN: "consume_password_reset_pin",
  CURRENT_SESSION_SECONDS_LEFT:
    "current_session_seconds_left",
  CURRENT_SESSION_STATE: "current_session_state",
  CURRENT_WORK_AREA: "current_work_area",
  FINISH_PASSWORD_RECOVERY: "finish_password_recovery",
  GRANT_WORKER_AREA: "grant_worker_area",
  GRANT_WORKER_MARK: "grant_worker_mark",
  IS_ADMIN: "is_admin",
  ISSUE_PASSWORD_RESET_PIN: "issue_password_reset_pin",
  PREPARE_WORKER_TEMPORARY_PASSWORD:
    "prepare_worker_temporary_password",
  MARK_PASSWORD_RESET_PIN_UNDELIVERED:
    "mark_password_reset_pin_undelivered",
  RECORD_FAILED_SIGN_IN: "record_failed_sign_in",
  RECORD_SUCCESSFUL_SIGN_IN: "record_successful_sign_in",
  REHIRE_WORKER: "rehire_worker",
  RETIRE_WORKER: "retire_worker",
  REVOKE_WORKER_AREA: "revoke_worker_area",
  REVOKE_WORKER_MARK: "revoke_worker_mark",
  UNLOCK_WORKER: "unlock_worker",
  TOUCH_CURRENT_SESSION_ACTIVITY:
    "touch_current_session_activity",
} as const;
