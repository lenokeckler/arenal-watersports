import { ACCESS_SHARED_COPY } from "@/app/constants";

export const LOGIN_FORM_COPY = {
  FORGOT_PASSWORD: "¿Olvidó su contraseña?",
  METADATA_TITLE: "Ingreso — Arenal Water Sports",
  PASSWORD_LABEL: "Contraseña",
  PASSWORD_RECOVERED_NOTICE:
    "Su contraseña se cambió. Ingrese con la nueva.",
  PASSWORD_PLACEHOLDER: "••••••••",
  SESSION_IDLE_NOTICE:
    "Su sesión se cerró por inactividad. Ingrese de nuevo.",
  SIGNED_OUT_NOTICE: "Cerró su sesión en este dispositivo.",
  SUBMIT: "Entrar al sistema",
  SUBMITTING: "Entrando…",
  USERNAME_LABEL: ACCESS_SHARED_COPY.USERNAME_LABEL,
  USERNAME_PLACEHOLDER:
    ACCESS_SHARED_COPY.USERNAME_PLACEHOLDER,
} as const;
