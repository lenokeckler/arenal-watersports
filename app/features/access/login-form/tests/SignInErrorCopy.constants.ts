import { SIGN_IN_ERROR_CODE } from "@/app/constants";

export const NON_USTED_WORDS_PATTERN =
  /(^|[^\p{L}])(tienes|puedes|quieres|debes|tu|tus|te|ti|contigo|ingresa|intenta|selecciona|escribe|revisa|vuelve)(?![\p{L}])/iu;

export const GENERIC_CREDENTIALS_COPY =
  "Usuario o contraseña incorrectos";

export const ACCOUNT_AND_SESSION_CODES = [
  SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
  SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
  SIGN_IN_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED,
  SIGN_IN_ERROR_CODE.SESSION_INACTIVE,
];
