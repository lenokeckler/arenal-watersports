import { MAIL_TRANSPORT } from "./MailTransport.constants";

export const PASSWORD_CHANGED_MAIL_COPY = {
  CHANGED:
    "La contraseña de su cuenta se cambió con un PIN de recuperación.",
  IF_NOT_YOU:
    "Si no fue usted, avise de inmediato a administración.",
  IF_YOU: "Si fue usted, no tiene que hacer nada.",
  SUBJECT: `Su contraseña se cambió — ${MAIL_TRANSPORT.SENDER_NAME}`,
} as const;
