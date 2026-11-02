export const NODEMAILER_REFERENCE_PATTERN =
  /from\s+["']nodemailer["']|require\(\s*["']nodemailer["']/;

export const NODEMAILER_ALLOWED_FILES = [
  "services/mail/createSmtpMailTransport.ts",
];
