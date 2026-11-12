export const EXTERNAL_GUIDE_REGISTRATION_COPY = {
  BACK: "Volver al calendario",
  EXPIRES_ON: "Fecha de caducidad",
  FAILED:
    "No se pudo registrar al guía externo. Intente de nuevo.",
  FULL_NAME: "Nombre completo",
  HEADING: "Registrar guía externo",
  INSTRUCTION:
    "Registre al guía externo. Su cédula será el usuario y recibirá una contraseña temporal para su primer ingreso.",
  INVALID:
    "Revise los datos del guía y la fecha de caducidad.",
  NATIONAL_ID: "Cédula",
  NATIONAL_ID_TAKEN:
    "Ya existe una cuenta con esta cédula.",
  NOT_ALLOWED:
    "Su cuenta no tiene permiso para registrar guías externos.",
  PERSONAL_EMAIL: "Correo personal (opcional)",
  REGISTER_ANOTHER: "Registrar otro guía externo",
  REGISTERED: (
    fullName: string,
    nationalId: string
  ): string =>
    `Se registró a ${fullName} con el usuario ${nationalId}.`,
  SUBMIT: "Registrar guía externo",
  SUBMITTING: "Registrando…",
} as const;
