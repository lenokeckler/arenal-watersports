export const SUPABASE_RPC = {
  COMPLETE_FIRST_PASSWORD_CHANGE:
    "complete_first_password_change",
  CONSUME_PASSWORD_RESET_PIN: "consume_password_reset_pin",
  FINISH_PASSWORD_RECOVERY: "finish_password_recovery",
  ISSUE_PASSWORD_RESET_PIN: "issue_password_reset_pin",
  MARK_PASSWORD_RESET_PIN_UNDELIVERED:
    "mark_password_reset_pin_undelivered",
  RECORD_FAILED_SIGN_IN: "record_failed_sign_in",
  RECORD_SUCCESSFUL_SIGN_IN: "record_successful_sign_in",
} as const;
