import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import {
  PERSONAL_EMAIL_ERROR_COPY,
  PERSONAL_EMAIL_REQUIRED_COPY,
} from "../constants/PersonalEmailErrorCopy.constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";

export const ALL_COPY = [
  ...Object.entries(PERSONAL_EMAIL_FORM_COPY),
  ...Object.entries(PERSONAL_EMAIL_ERROR_COPY),
  ...Object.entries(PERSONAL_EMAIL_REQUIRED_COPY),
];

export const VOSEO_WORDS_PATTERN =
  /(^|[^\p{L}])(vos|sos|podés|tenés|querés|debés|escribí|ingresá|elegí|repetí|volvé|guardá|intentá|revisá|seleccioná|cambiá|quitá|registrá)(?![\p{L}])/iu;

export const TUTEO_WORDS_PATTERN =
  /(^|[^\p{L}])(tienes|puedes|quieres|debes|tu|tus|te|ti|contigo|ingresa|intenta|selecciona|escribe|revisa|vuelve|repite|elige|quita|registra)(?![\p{L}])/iu;

export const VOSEO_SAMPLES = [
  "Escribí su correo",
  "Podés quitarlo",
  "vos",
] as const;

export const TUTEO_SAMPLES = [
  "Escribe tu correo",
  "Puedes quitarlo",
  "tu correo",
] as const;

export const APPROVED_FORM_COPY = {
  BACK: "Volver a Mi perfil",
  CURRENT_PASSWORD_LABEL: "Contraseña actual",
  EMAIL_HINT:
    "Solo se usa para enviarle el PIN de recuperación.",
  EMAIL_LABEL: "Correo personal",
  EMAIL_PLACEHOLDER: "nombre@gmail.com",
  HEADING: "Correo personal",
  METADATA_TITLE: "Correo personal — Arenal Water Sports",
  PASSWORD_PLACEHOLDER: "••••••••",
  REMOVE: "Quitar correo",
  REMOVING: "Quitando…",
  SUBMIT: "Guardar correo",
  SUBMITTING: "Guardando…",
};

export const APPROVED_REQUIRED_COPY = {
  ADMINISTRATION:
    "La cuenta de administración necesita un correo.",
  REGISTERED:
    "Escriba su correo personal o use Quitar correo.",
  UNREGISTERED: "Escriba su correo personal.",
};

export const APPROVED_ERROR_COPY = {
  [PERSONAL_EMAIL_ERROR_CODE.ADMINISTRATION_EMAIL_REQUIRED]:
    APPROVED_REQUIRED_COPY.ADMINISTRATION,
  [PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID]:
    "La contraseña actual no es correcta.",
  [PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_REQUIRED]:
    "Escriba su contraseña actual.",
  [PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID]:
    "Escriba un correo válido, por ejemplo nombre@gmail.com.",
  [PERSONAL_EMAIL_ERROR_CODE.EMAIL_TOO_LONG]:
    "El correo es demasiado largo.",
};
