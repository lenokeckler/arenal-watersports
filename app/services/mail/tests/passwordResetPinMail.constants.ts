export const PIN_MAIL_INPUT = {
  personalEmail: "worker@example.test",
  pin: "481516",
  lifetimeMinutes: 10,
};

export const LEADING_ZEROS_PIN = "004815";

export const PIN_LINE_PATTERN = /^\d{6}$/gm;

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

export const URL_PATTERN =
  /https?|www\.|:\/\/|[a-z0-9-]+\.[a-z]{2,}/i;
export const LINK_SAMPLES = [
  "https://arenal.example/reset",
  "www.arenal.example",
  "arenal.example/reset",
];
export const PIN_MAIL_LINE_BREAK = "\n";
export const OTHER_LIFETIME_MINUTES = 7;
export const SINGLE_MINUTE = 1;
export const LIFETIME_PHRASE_PREFIX = "Vence en";
export const DIGIT_PATTERN = /\d/;
