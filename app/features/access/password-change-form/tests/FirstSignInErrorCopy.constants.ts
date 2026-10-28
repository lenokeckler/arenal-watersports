import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants/access/PasswordChangeError.constants";

export const NON_USTED_WORDS_PATTERN =
  /(^|[^\p{L}])(tienes|puedes|quieres|debes|tu|tus|te|ti|contigo|ingresa|intenta|selecciona|escribe|revisa|vuelve|repite|elige)(?![\p{L}])/iu;

export const APPROVED_SHARED_PASSWORD_COPY = {
  [PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH]:
    "Las contraseñas no coinciden.",
  [PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_REQUIRED]:
    "Repita la contraseña nueva.",
  [PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_REQUIRED]:
    "Escriba la contraseña nueva.",
  [PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES]:
    "La contraseña nueva no cumple los requisitos.",
};
