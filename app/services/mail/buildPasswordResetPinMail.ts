import {
  MAIL_TRANSPORT,
  PASSWORD_RESET_PIN_MAIL_COPY,
} from "@/app/constants";
import type { MailMessage } from "./models/MailMessage.interface";
import type { PasswordResetPinMailInput } from "./models/PasswordResetPinMailInput.interface";

export const buildPasswordResetPinMail = ({
  personalEmail,
  pin,
  lifetimeMinutes,
}: PasswordResetPinMailInput): MailMessage => ({
  to: personalEmail,
  subject: PASSWORD_RESET_PIN_MAIL_COPY.SUBJECT,
  text: [
    PASSWORD_RESET_PIN_MAIL_COPY.BRAND,
    MAIL_TRANSPORT.BLANK_LINE,
    PASSWORD_RESET_PIN_MAIL_COPY.INTRODUCTION,
    MAIL_TRANSPORT.BLANK_LINE,
    pin,
    MAIL_TRANSPORT.BLANK_LINE,
    PASSWORD_RESET_PIN_MAIL_COPY.INSTRUCTION(
      lifetimeMinutes
    ),
    MAIL_TRANSPORT.BLANK_LINE,
    PASSWORD_RESET_PIN_MAIL_COPY.NOT_REQUESTED,
    PASSWORD_RESET_PIN_MAIL_COPY.DO_NOT_SHARE,
    MAIL_TRANSPORT.BLANK_LINE,
    PASSWORD_RESET_PIN_MAIL_COPY.AUTOMATIC,
  ].join(MAIL_TRANSPORT.LINE_BREAK),
});
