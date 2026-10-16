import { PASSWORD_RESET_PIN } from "@/app/constants";

export const PASSWORD_RECOVERY_RESET_COPY = {
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
  PIN_HINT: `Son ${PASSWORD_RESET_PIN.LENGTH} dígitos.`,
  PIN_LABEL: "PIN",
  REQUEST_ANOTHER_PIN: "Pedir otro PIN",
  SUBMIT: "Guardar contraseña",
  SUBMITTING: "Guardando…",
} as const;
