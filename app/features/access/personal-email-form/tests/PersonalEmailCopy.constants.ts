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
