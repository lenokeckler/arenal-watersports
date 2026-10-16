import { createTransport } from "nodemailer";
import {
  MAIL_ERROR_CODE,
  MAIL_TRANSPORT,
} from "@/app/constants";
import { containsLineBreak } from "./containsLineBreak";
import { MailError } from "./MailError";
import type { MailConfiguration } from "./models/MailConfiguration.interface";
import type { MailMessage } from "./models/MailMessage.interface";
import type { MailTransport } from "./models/MailTransport.type";
import { readMailConfiguration } from "./readMailConfiguration";

const assertNoHeaderInjection = (
  message: MailMessage
): void => {
  if (
    containsLineBreak(message.to) ||
    containsLineBreak(message.subject)
  ) {
    throw new MailError(MAIL_ERROR_CODE.HEADER_INJECTION);
  }
};

export const createSmtpMailTransport = (
  configuration: MailConfiguration = readMailConfiguration()
): MailTransport => {
  const transporter = createTransport({
    auth: configuration.user
      ? {
          user: configuration.user,
          pass: configuration.password,
        }
      : undefined,
    connectionTimeout:
      MAIL_TRANSPORT.CONNECTION_TIMEOUT_MILLISECONDS,
    greetingTimeout:
      MAIL_TRANSPORT.GREETING_TIMEOUT_MILLISECONDS,
    host: configuration.host,
    port: configuration.port,
    requireTLS: configuration.requireTLS,
    secure: configuration.secure,
    socketTimeout:
      MAIL_TRANSPORT.SOCKET_TIMEOUT_MILLISECONDS,
  });

  return async (message) => {
    assertNoHeaderInjection(message);

    await transporter.sendMail({
      from: `${MAIL_TRANSPORT.SENDER_NAME} <${configuration.from}>`,
      subject: message.subject,
      text: message.text,
      to: message.to,
    });
  };
};
