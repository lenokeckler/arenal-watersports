export const WORKER_EXPIRY_COPY = {
  DATE_LABEL: "Nueva fecha de caducidad",
  EXPIRED_ON: (date: string): string =>
    `Caducó el ${date}: la cuenta no puede entrar.`,
  EXPIRES_ON: (date: string): string =>
    `Caduca el ${date}.`,
  EXTEND: "Extender caducidad",
  TITLE: "Caducidad de la cuenta",
  EXTEND_PENDING: "Extendiendo…",
} as const;
