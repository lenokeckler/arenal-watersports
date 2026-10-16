export const PIN_MAIL_INPUT = {
  personalEmail: "worker@example.test",
  pin: "481516",
  lifetimeMinutes: 10,
};

export const PIN_MAIL_USERNAME = "maria.rojas";

export const APPROVED_PIN_MAIL_SUBJECT =
  "Su PIN de recuperación — Arenal Water Sports";

export const APPROVED_PIN_MAIL_TEXT = [
  "Arenal Water Sports",
  "",
  "Su PIN para recuperar la contraseña es:",
  "",
  "481516",
  "",
  "Escríbalo en la pantalla de recuperación. Vence en 10 minutos y solo sirve una vez.",
  "",
  "Si usted no lo pidió, ignore este correo: su contraseña no cambia.",
  "No comparta este PIN con nadie. Nadie de Arenal Water Sports se lo pedirá.",
  "",
  "Este mensaje es automático. No lo responda.",
].join("\n");

export const URL_PATTERN = /http|www|:\/\//i;
export const DIGIT_PATTERN = /\d/;
