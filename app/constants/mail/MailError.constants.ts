export const MAIL_ERROR_CODE = {
  CREDENTIALS_INCOMPLETE: "mail-credentials-incomplete",
  CREDENTIALS_REQUIRED: "mail-credentials-required",
  FROM_INVALID: "mail-from-invalid",
  FROM_MISSING: "mail-from-missing",
  HEADER_INJECTION: "mail-header-injection",
  HOST_MISSING: "mail-host-missing",
  RECIPIENT_INVALID: "mail-recipient-invalid",
  SEND_FAILED: "mail-send-failed",
  PORT_INVALID: "mail-port-invalid",
  PORT_MISSING: "mail-port-missing",
} as const;

export type MailErrorCode =
  (typeof MAIL_ERROR_CODE)[keyof typeof MAIL_ERROR_CODE];
