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

export const NON_DECIMAL_PORTS = [
  "5e2",
  "0x1F",
  "+587",
  "5 87",
];
export const BOUNDARY_PORTS = ["1", "65535"];
export const PADDED_PORT = " 587 ";
export const LOOKALIKE_LOOPBACK_HOSTS = [
  "LOCALHOST",
  "127.0.0.2",
  "[::1]",
  "localhost.example.test",
];
export const BLANK_VALUE = "   ";
export const FROM_WITH_EXTRA_MAILBOX =
  "a@example.test>, evil@example.test";
export const INVALID_RECIPIENTS = [
  "a@example.test, evil@example.test",
  "a@example.test;evil@example.test",
  "Bcc: evil@example.test",
  "a,evil@example.test",
  "a;evil@example.test",
  "Bcc:evil@example.test",
  "a@example.test,evil",
  "a@example.test;evil",
  "a@example.test:evil",
  "<a@example.test>",
  "Worker <a@example.test>",
  `${JSON.stringify("a")}@example.test`,
  "(note)a@example.test",
  "a@example.test (note)",
  "a\\b@example.test",
  "a b@example.test",
  " a@example.test",
  "a@example.test\u2028",
  "a\u0085@example.test",
  "a@@example.test",
  "plainaddress",
  "",
];
export const UNICODE_LINE_SEPARATORS = ["\u2028", "\u0085"];
export const PADDED_PASSWORD = "  padded password  ";
export const WHITESPACE_ONLY_PASSWORD = "   ";
export const UNTRIMMED_INVALID_SENDERS =
  INVALID_RECIPIENTS.filter(
    (value) => value !== "" && value.trim() === value
  );
export const SMTP_RESPONSE_TEXT =
  "535 5.7.8 Username and Password not accepted";

export const URL_PATTERN =
  /https?|www\.|:\/\/|[a-z0-9-]+\.[a-z]{2,}/i;
export const LINK_SAMPLES = [
  "https://arenal.example/reset",
  "www.arenal.example",
  "arenal.example/reset",
];
