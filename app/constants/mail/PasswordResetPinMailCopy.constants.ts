import { MAIL_TRANSPORT } from "./MailTransport.constants";

const SINGULAR_MINUTES = 1;

export const PASSWORD_RESET_PIN_MAIL_COPY = {
  AUTOMATIC: "Este mensaje es automático. No lo responda.",
  BRAND: MAIL_TRANSPORT.SENDER_NAME,
  DO_NOT_SHARE: `No comparta este PIN con nadie. Nadie de ${MAIL_TRANSPORT.SENDER_NAME} se lo pedirá.`,
  INSTRUCTION: (minutes: number): string =>
    `Escríbalo en la pantalla de recuperación. Vence en ${
      minutes === SINGULAR_MINUTES
        ? `${minutes} minuto`
        : `${minutes} minutos`
    } y solo sirve una vez.`,
  INTRODUCTION: "Su PIN para recuperar la contraseña es:",
  NOT_REQUESTED:
    "Si usted no lo pidió, ignore este correo: su contraseña no cambia.",
  SUBJECT: `Su PIN de recuperación — ${MAIL_TRANSPORT.SENDER_NAME}`,
} as const;
