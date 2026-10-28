import { ACCESS_SHARED_COPY } from "@/app/constants";

export const PASSWORD_RECOVERY_REQUEST_COPY = {
  BACK: ACCESS_SHARED_COPY.BACK_TO_LOGIN,
  HEADING: "Recupere su contraseña",
  INSTRUCTION:
    "Escriba su nombre de usuario y le enviaremos un PIN al correo personal de su cuenta.",
  METADATA_TITLE:
    "Recuperar contraseña — Arenal Water Sports",
  NO_EMAIL_NOTE:
    "Si su cuenta no tiene correo registrado, pídale a administración una contraseña temporal.",
  SUBMIT: "Pedir PIN",
  SUBMITTING: "Enviando…",
  USERNAME_LABEL: ACCESS_SHARED_COPY.USERNAME_LABEL,
  USERNAME_PLACEHOLDER:
    ACCESS_SHARED_COPY.USERNAME_PLACEHOLDER,
} as const;
