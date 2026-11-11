import {
  MAIL_ENVIRONMENT,
  MAIL_ERROR_CODE,
} from "@/app/constants";
import { isPlainMailAddress } from "./isPlainMailAddress";
import { MailError } from "./MailError";
import { readMailVariable } from "./readMailVariable";

export const readMailSender = (): string => {
  const from = readMailVariable(
    MAIL_ENVIRONMENT.FROM_ADDRESS
  );

  if (!from) {
    throw new MailError(MAIL_ERROR_CODE.FROM_MISSING);
  }

  if (!isPlainMailAddress(from)) {
    throw new MailError(MAIL_ERROR_CODE.FROM_INVALID);
  }

  return from;
};
