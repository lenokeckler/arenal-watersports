export const CHANGED_MAIL_INPUT = {
  personalEmail: "worker@example.test",
};

export const APPROVED_CHANGED_MAIL_SUBJECT =
  "Su contraseña se cambió — Arenal Water Sports";

export const APPROVED_CHANGED_MAIL_TEXT = [
  "Arenal Water Sports",
  "",
  "La contraseña de su cuenta se cambió con un PIN de recuperación.",
  "",
  "Si fue usted, no tiene que hacer nada.",
  "Si no fue usted, avise de inmediato a administración.",
  "",
  "Este mensaje es automático. No lo responda.",
].join("\n");

export const PIN_LENGTH_DIGITS_PATTERN = /\d{6}/;
export const ANY_DIGIT_PATTERN = /\d/;
