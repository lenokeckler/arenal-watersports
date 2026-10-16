import { PASSWORD_RESET_PIN } from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "./PasswordRecoveryRequestCopy.constants";

export const PASSWORD_RECOVERY_RESET_COPY = {
  BACK: "Volver a ingresar",
  CONFIRMATION:
    "Si la cuenta puede recuperarse, enviamos un PIN al correo registrado. Vence a los pocos minutos.",
  CONFIRM_PASSWORD_LABEL: "Repetir contraseña nueva",
  HEADING: "Restablezca su contraseña",
  METADATA_TITLE:
    "Restablecer contraseña — Arenal Water Sports",
  NEW_PASSWORD_LABEL: "Contraseña nueva",
  NO_EMAIL_NOTE:
    PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE,
  NOT_RECEIVED_NOTE:
    "¿No le llegó? Revise el correo no deseado o pida otro PIN.",
  PIN_HINT: `Son ${PASSWORD_RESET_PIN.LENGTH} dígitos.`,
  PIN_LABEL: "PIN",
  REQUEST_ANOTHER_PIN: "Pedir otro PIN",
  SUBMIT: "Guardar contraseña",
  SUBMITTING: "Guardando…",
  USERNAME_LABEL: "Nombre de usuario",
} as const;
