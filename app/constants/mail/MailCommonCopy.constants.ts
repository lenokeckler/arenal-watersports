import { MAIL_TRANSPORT } from "./MailTransport.constants";

export const MAIL_COMMON_COPY = {
  AUTOMATIC: "Este mensaje es automático. No lo responda.",
  BRAND: MAIL_TRANSPORT.SENDER_NAME,
} as const;
