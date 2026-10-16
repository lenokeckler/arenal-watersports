import { PASSWORD_RESET_PIN_MAIL_COPY } from "@/app/constants";
import type { MailMessage } from "./models/MailMessage.interface";
import type { PasswordResetPinMailInput } from "./models/PasswordResetPinMailInput.interface";

export const buildPasswordResetPinMail = ({
  personalEmail,
  pin,
  lifetimeMinutes,
}: PasswordResetPinMailInput): MailMessage => ({
  to: personalEmail,
  subject: PASSWORD_RESET_PIN_MAIL_COPY.SUBJECT,
  text: PASSWORD_RESET_PIN_MAIL_COPY.TEXT(
    pin,
    lifetimeMinutes
  ),
});
