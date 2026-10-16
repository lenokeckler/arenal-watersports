import { MAIL_ENVIRONMENT } from "@/app/constants";

export const REMOTE_HOST = "smtp.example.test";
export const SECRET_PASSWORD = "s3cret-app-password";
export const SMTP_USER = "mailer@example.test";
export const FROM_ADDRESS = "recuperacion@example.test";
export const LOCAL_PORT = "54325";
export const SUBMISSION_PORT = "587";
export const IMPLICIT_TLS_PORT = "465";

export const VALID_REMOTE_ENVIRONMENT = {
  [MAIL_ENVIRONMENT.FROM_ADDRESS]: FROM_ADDRESS,
  [MAIL_ENVIRONMENT.SMTP_HOST]: REMOTE_HOST,
  [MAIL_ENVIRONMENT.SMTP_PASSWORD]: SECRET_PASSWORD,
  [MAIL_ENVIRONMENT.SMTP_PORT]: SUBMISSION_PORT,
  [MAIL_ENVIRONMENT.SMTP_USER]: SMTP_USER,
};

export const VALID_LOOPBACK_ENVIRONMENT = {
  [MAIL_ENVIRONMENT.FROM_ADDRESS]: FROM_ADDRESS,
  [MAIL_ENVIRONMENT.SMTP_HOST]: "127.0.0.1",
  [MAIL_ENVIRONMENT.SMTP_PASSWORD]: "",
  [MAIL_ENVIRONMENT.SMTP_PORT]: LOCAL_PORT,
  [MAIL_ENVIRONMENT.SMTP_USER]: "",
};

export const LOOPBACK_HOSTS = [
  "127.0.0.1",
  "localhost",
  "::1",
];

export const INVALID_PORTS = [
  "0",
  "65536",
  "-1",
  "25.5",
  "abc",
  "587abc",
  "1e3",
];

export const RECIPIENT = "worker@example.test";
export const SUBJECT = "Su PIN";
export const BODY = "123456";
export const LINE_BREAK_VALUES = [
  "a@example.test\r\nBcc: x@example.test",
  "a@example.test\nBcc: x@example.test",
  "Su PIN\rBcc: x@example.test",
];
