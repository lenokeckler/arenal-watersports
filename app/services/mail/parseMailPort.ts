import {
  MAIL_ERROR_CODE,
  MAIL_TRANSPORT,
} from "@/app/constants";
import { MailError } from "./MailError";

export const parseMailPort = (rawPort: string): number => {
  if (!rawPort) {
    throw new MailError(MAIL_ERROR_CODE.PORT_MISSING);
  }

  const port = Number(rawPort);
  const isValid =
    MAIL_TRANSPORT.PORT_PATTERN.test(rawPort) &&
    port >= MAIL_TRANSPORT.MINIMUM_PORT &&
    port <= MAIL_TRANSPORT.MAXIMUM_PORT;

  if (!isValid) {
    throw new MailError(MAIL_ERROR_CODE.PORT_INVALID);
  }

  return port;
};
