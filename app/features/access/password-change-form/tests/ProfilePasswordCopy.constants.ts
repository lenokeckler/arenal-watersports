export const TEMPORARY_WORD_PATTERN = /temporal/i;

export const PROFILE_ERROR_COPY_OVERRIDES = [
  [
    "currentPasswordInvalid",
    "La contraseña actual no es correcta.",
  ],
  [
    "currentPasswordRequired",
    "Escriba su contraseña actual.",
  ],
  [
    "newPasswordSameAsCurrent",
    "La contraseña nueva debe ser distinta de la actual.",
  ],
] as const;

export const VOSEO_WORDS_PATTERN =
  /(^|[^\p{L}])(vos|sos|podés|tenés|querés|debés|escribí|ingresá|elegí|repetí|volvé|guardá|intentá|revisá|seleccioná|cambiá)(?![\p{L}])/iu;
