import {
  ACCESS_SHARED_COPY,
  PASSWORD_RECOVERY_ERROR_CODE,
} from "@/app/constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import { PASSWORD_RECOVERY_RESET_ERROR_COPY } from "../constants/PasswordRecoveryResetErrorCopy.constants";

export const ALL_RESET_COPY = [
  ...Object.entries(PASSWORD_RECOVERY_RESET_COPY),
  ...Object.entries(PASSWORD_RECOVERY_RESET_ERROR_COPY),
];

export const APPROVED_RESET_COPY = {
  CONFIRMATION:
    "Si la cuenta puede recuperarse, enviamos un PIN al correo registrado. Vence a los pocos minutos.",
  CONFIRM_PASSWORD_LABEL: "Repetir contraseña nueva",
  HEADING: "Restablezca su contraseña",
  METADATA_TITLE:
    "Restablecer contraseña — Arenal Water Sports",
  NEW_PASSWORD_LABEL: "Contraseña nueva",
  NOT_RECEIVED_NOTE:
    "¿No le llegó? Revise el correo no deseado o pida otro PIN.",
  PASSWORD_PLACEHOLDER: "••••••••",
  PIN_HINT: "Son 6 dígitos.",
  PIN_LABEL: "PIN",
  REQUEST_ANOTHER_PIN: "Pedir otro PIN",
  SUBMIT: "Guardar contraseña",
  SUBMITTING: "Guardando…",
};

export const APPROVED_RESET_UNKNOWN_COPY =
  "No se pudo cambiar la contraseña. Intente de nuevo.";

export const SIGN_IN_UNKNOWN_COPY =
  ACCESS_SHARED_COPY.UNKNOWN;

export const APPROVED_RESET_ERROR_COPY = {
  [PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_MISMATCH]:
    "Las contraseñas no coinciden.",
  [PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_REQUIRED]:
    "Repita la contraseña nueva.",
  [PASSWORD_RECOVERY_ERROR_CODE.NETWORK]:
    ACCESS_SHARED_COPY.NETWORK,
  [PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_REQUIRED]:
    "Escriba la contraseña nueva.",
  [PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_RULES]:
    "La contraseña nueva no cumple los requisitos.",
  [PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_TOO_LONG]:
    ACCESS_SHARED_COPY.PASSWORD_TOO_LONG,
  [PASSWORD_RECOVERY_ERROR_CODE.PASSWORD_NOT_SAVED]:
    "No se pudo guardar la contraseña. Pida un PIN nuevo e intente otra vez.",
  [PASSWORD_RECOVERY_ERROR_CODE.PIN_FORMAT]:
    "El PIN tiene 6 dígitos.",
  [PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID]:
    "El PIN no es correcto o ya venció. Pida uno nuevo si hace falta.",
  [PASSWORD_RECOVERY_ERROR_CODE.PIN_REQUIRED]:
    "Escriba el PIN.",
  [PASSWORD_RECOVERY_ERROR_CODE.TOO_MANY_REQUESTS]:
    ACCESS_SHARED_COPY.TOO_MANY_REQUESTS,
  [PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN]:
    APPROVED_RESET_UNKNOWN_COPY,
  [PASSWORD_RECOVERY_ERROR_CODE.USERNAME_LENGTH]:
    ACCESS_SHARED_COPY.USERNAME_LENGTH,
  [PASSWORD_RECOVERY_ERROR_CODE.USERNAME_REQUIRED]:
    ACCESS_SHARED_COPY.USERNAME_REQUIRED,
};
