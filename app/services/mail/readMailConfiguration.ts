import {
  MAIL_ENVIRONMENT,
  MAIL_ERROR_CODE,
  MAIL_TRANSPORT,
} from "@/app/constants";
import { containsLineBreak } from "./containsLineBreak";
import { isLoopbackHost } from "./isLoopbackHost";
import { MailError } from "./MailError";
import type { MailConfiguration } from "./models/MailConfiguration.interface";
import { parseMailPort } from "./parseMailPort";

const readVariable = (name: string): string =>
  process.env[name]?.trim() ?? "";

export const readMailConfiguration =
  (): MailConfiguration => {
    const host = readVariable(MAIL_ENVIRONMENT.SMTP_HOST);
    const from = readVariable(
      MAIL_ENVIRONMENT.FROM_ADDRESS
    );
    const user = readVariable(MAIL_ENVIRONMENT.SMTP_USER);
    const password = readVariable(
      MAIL_ENVIRONMENT.SMTP_PASSWORD
    );

    if (!host) {
      throw new MailError(MAIL_ERROR_CODE.HOST_MISSING);
    }

    const port = parseMailPort(
      readVariable(MAIL_ENVIRONMENT.SMTP_PORT)
    );

    if (!from) {
      throw new MailError(MAIL_ERROR_CODE.FROM_MISSING);
    }

    if (containsLineBreak(from)) {
      throw new MailError(MAIL_ERROR_CODE.FROM_INVALID);
    }

    if (Boolean(user) !== Boolean(password)) {
      throw new MailError(
        MAIL_ERROR_CODE.CREDENTIALS_INCOMPLETE
      );
    }

    const isRemote = !isLoopbackHost(host);

    if (isRemote && !user) {
      throw new MailError(
        MAIL_ERROR_CODE.CREDENTIALS_REQUIRED
      );
    }

    const secure =
      port === MAIL_TRANSPORT.IMPLICIT_TLS_PORT;

    return {
      from,
      host,
      password,
      port,
      requireTLS: isRemote && !secure,
      secure,
      user,
    };
  };
