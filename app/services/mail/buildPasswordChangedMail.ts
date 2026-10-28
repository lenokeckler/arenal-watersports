import {
  MAIL_COMMON_COPY,
  MAIL_TRANSPORT,
  PASSWORD_CHANGED_MAIL_COPY,
} from "@/app/constants";
import { joinMailLines } from "./joinMailLines";
import type { MailMessage } from "./models/MailMessage.interface";
import type { PasswordChangedMailInput } from "./models/PasswordChangedMailInput.interface";

export const buildPasswordChangedMail = ({
  personalEmail,
}: PasswordChangedMailInput): MailMessage => ({
  to: personalEmail,
  subject: PASSWORD_CHANGED_MAIL_COPY.SUBJECT,
  text: joinMailLines([
    MAIL_COMMON_COPY.BRAND,
    MAIL_TRANSPORT.BLANK_LINE,
    PASSWORD_CHANGED_MAIL_COPY.CHANGED,
    MAIL_TRANSPORT.BLANK_LINE,
    PASSWORD_CHANGED_MAIL_COPY.IF_YOU,
    PASSWORD_CHANGED_MAIL_COPY.IF_NOT_YOU,
    MAIL_TRANSPORT.BLANK_LINE,
    MAIL_COMMON_COPY.AUTOMATIC,
  ]),
});
