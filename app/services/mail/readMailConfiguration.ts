import {
  MAIL_ENVIRONMENT,
  MAIL_ERROR_CODE,
} from "@/app/constants";
import { isLoopbackHost } from "./isLoopbackHost";
import { MailError } from "./MailError";
import type { MailConfiguration } from "./models/MailConfiguration.interface";
import { parseMailPort } from "./parseMailPort";
import { readMailCredentials } from "./readMailCredentials";
import { readMailSender } from "./readMailSender";
import { readMailVariable } from "./readMailVariable";
import { resolveMailTls } from "./resolveMailTls";

export const readMailConfiguration =
  (): MailConfiguration => {
    const host = readMailVariable(
      MAIL_ENVIRONMENT.SMTP_HOST
    );

    if (!host) {
      throw new MailError(MAIL_ERROR_CODE.HOST_MISSING);
    }

    const port = parseMailPort(
      readMailVariable(MAIL_ENVIRONMENT.SMTP_PORT)
    );
    const from = readMailSender();
    const credentials = readMailCredentials();
    const isRemote = !isLoopbackHost(host);

    if (isRemote && !credentials.user) {
      throw new MailError(
        MAIL_ERROR_CODE.CREDENTIALS_REQUIRED
      );
    }

    return {
      from,
      host,
      port,
      ...credentials,
      ...resolveMailTls(port, isRemote),
    };
  };
