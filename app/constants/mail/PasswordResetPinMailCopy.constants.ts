const LINE_BREAK = "\n";
const BLANK_LINE = "";

export const PASSWORD_RESET_PIN_MAIL_COPY = {
  SUBJECT: "Su PIN de recuperación — Arenal Water Sports",
  BRAND: "Arenal Water Sports",
  INTRODUCTION: "Su PIN para recuperar la contraseña es:",
  INSTRUCTION: (minutes: number): string =>
    `Escríbalo en la pantalla de recuperación. Vence en ${minutes} minutos y solo sirve una vez.`,
  NOT_REQUESTED:
    "Si usted no lo pidió, ignore este correo: su contraseña no cambia.",
  DO_NOT_SHARE:
    "No comparta este PIN con nadie. Nadie de Arenal Water Sports se lo pedirá.",
  AUTOMATIC: "Este mensaje es automático. No lo responda.",
  TEXT: (pin: string, minutes: number): string =>
    [
      PASSWORD_RESET_PIN_MAIL_COPY.BRAND,
      BLANK_LINE,
      PASSWORD_RESET_PIN_MAIL_COPY.INTRODUCTION,
      BLANK_LINE,
      pin,
      BLANK_LINE,
      PASSWORD_RESET_PIN_MAIL_COPY.INSTRUCTION(minutes),
      BLANK_LINE,
      PASSWORD_RESET_PIN_MAIL_COPY.NOT_REQUESTED,
      PASSWORD_RESET_PIN_MAIL_COPY.DO_NOT_SHARE,
      BLANK_LINE,
      PASSWORD_RESET_PIN_MAIL_COPY.AUTOMATIC,
    ].join(LINE_BREAK),
} as const;
