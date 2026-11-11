import {
  MAIL_ENVIRONMENT,
  MAIL_ERROR_CODE,
} from "@/app/constants";
import { MailError } from "./MailError";
import type { MailCredentials } from "./models/MailCredentials.interface";
import { readMailVariable } from "./readMailVariable";

export const readMailCredentials = (): MailCredentials => {
  const user = readMailVariable(MAIL_ENVIRONMENT.SMTP_USER);
  const password =
    process.env[MAIL_ENVIRONMENT.SMTP_PASSWORD] ?? "";

  if (Boolean(user) !== Boolean(password)) {
    throw new MailError(
      MAIL_ERROR_CODE.CREDENTIALS_INCOMPLETE
    );
  }

  return { user, password };
};
