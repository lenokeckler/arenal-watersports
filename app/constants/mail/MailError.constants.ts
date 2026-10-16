export const MAIL_ERROR_CODE = {
  CREDENTIALS_INCOMPLETE: "mail-credentials-incomplete",
  CREDENTIALS_REQUIRED: "mail-credentials-required",
  FROM_INVALID: "mail-from-invalid",
  FROM_MISSING: "mail-from-missing",
  HOST_MISSING: "mail-host-missing",
  PORT_INVALID: "mail-port-invalid",
  PORT_MISSING: "mail-port-missing",
} as const;

export type MailErrorCode =
  (typeof MAIL_ERROR_CODE)[keyof typeof MAIL_ERROR_CODE];
