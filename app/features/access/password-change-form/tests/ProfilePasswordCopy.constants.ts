import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants/access/PasswordChangeError.constants";

export const TEMPORARY_WORD_PATTERN = /temporal/i;

export const PROFILE_ERROR_COPY_OVERRIDES = [
  [
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    "La contraseña actual no es correcta.",
  ],
  [
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_REQUIRED,
    "Escriba su contraseña actual.",
  ],
  [
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
    "La contraseña nueva debe ser distinta de la actual.",
  ],
] as const;

export const VOSEO_WORDS_PATTERN =
  /(^|[^\p{L}])(vos|sos|podés|tenés|querés|debés|escribí|ingresá|elegí|repetí|volvé|guardá|intentá|revisá|seleccioná|cambiá)(?![\p{L}])/iu;
