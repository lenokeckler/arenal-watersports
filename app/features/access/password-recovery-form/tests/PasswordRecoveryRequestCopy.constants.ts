import {
  ACCESS_SHARED_COPY,
  PASSWORD_RECOVERY_ERROR_CODE,
} from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_ERROR_COPY } from "../constants/PasswordRecoveryRequestErrorCopy.constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";

export const ALL_COPY = [
  ...Object.entries(PASSWORD_RECOVERY_REQUEST_COPY),
  ...Object.entries(PASSWORD_RECOVERY_REQUEST_ERROR_COPY),
];

export const VOSEO_SAMPLES = [
  "Escribí su usuario",
  "Podés pedirlo",
  "vos",
] as const;

export const TUTEO_SAMPLES = [
  "Escribe tu usuario",
  "Puedes pedirlo",
  "tu usuario",
] as const;

export const APPROVED_REQUEST_COPY = {
  BACK: "Volver a ingresar",
  HEADING: "Recupere su contraseña",
  INSTRUCTION:
    "Escriba su nombre de usuario y le enviaremos un PIN al correo personal de su cuenta.",
  METADATA_TITLE:
    "Recuperar contraseña — Arenal Water Sports",
  NO_EMAIL_NOTE:
    "Si su cuenta no tiene correo registrado, pídale a administración una contraseña temporal.",
  SUBMIT: "Pedir PIN",
  SUBMITTING: "Enviando…",
  USERNAME_LABEL: "Nombre de usuario",
  USERNAME_PLACEHOLDER: "Ingrese su nombre de usuario",
};

export const APPROVED_UNKNOWN_COPY =
  "No se pudo enviar el PIN. Intente de nuevo.";

export const APPROVED_ERROR_COPY = {
  [PASSWORD_RECOVERY_ERROR_CODE.NETWORK]:
    ACCESS_SHARED_COPY.NETWORK,
  [PASSWORD_RECOVERY_ERROR_CODE.TOO_MANY_REQUESTS]:
    ACCESS_SHARED_COPY.TOO_MANY_REQUESTS,
  [PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN]:
    APPROVED_UNKNOWN_COPY,
  [PASSWORD_RECOVERY_ERROR_CODE.USERNAME_LENGTH]:
    ACCESS_SHARED_COPY.USERNAME_LENGTH,
  [PASSWORD_RECOVERY_ERROR_CODE.USERNAME_REQUIRED]:
    ACCESS_SHARED_COPY.USERNAME_REQUIRED,
};
