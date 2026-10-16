import type { MailErrorCode } from "@/app/constants";

export class MailError extends Error {
  readonly code: MailErrorCode;

  constructor(code: MailErrorCode) {
    super(code);
    this.name = "MailError";
    this.code = code;
  }
}
