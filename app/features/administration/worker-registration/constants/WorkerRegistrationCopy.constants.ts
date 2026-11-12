import {
  SUPABASE_WORK_AREA,
  WORKER_REGISTRATION_ERROR_CODE,
  type AssignableBaseRole,
  type WorkerRegistrationErrorCode,
} from "@/app/constants";

export const WORKER_REGISTRATION_COPY = {
  BACK: "Volver al inicio",
  BASE_ROLE_HINT:
    "El sistema tiene una sola cuenta de administración, que ya existe.",
  BASE_ROLE_LABEL: "Rol",
  BASE_ROLE_PLACEHOLDER: "Elija el rol",
  FULL_NAME_LABEL: "Nombre completo",
  FULL_NAME_PLACEHOLDER: "Ej. Celso Rojas Mora",
  HEADING: "Registrar trabajador",
  INSTRUCTION:
    "Registre a la persona y asígnele su rol. El sistema crea una contraseña temporal que el trabajador cambia en su primer ingreso.",
  METADATA_TITLE:
    "Registrar trabajador — Arenal Water Sports",
  REGISTER_ANOTHER: "Registrar otro trabajador",
  REGISTERED_NOTICE: (
    fullName: string,
    username: string
  ): string =>
    `Se registró a ${fullName} con el usuario ${username}.`,
  SUBMIT: "Registrar trabajador",
  SUBMITTING: "Registrando…",
  USERNAME_HINT:
    "Entre 3 y 40 caracteres: letras sin tilde, números, punto, guion o guion bajo.",
  USERNAME_LABEL: "Nombre de usuario",
  USERNAME_PLACEHOLDER: "Ej. celso.rojas",
} as const;

export const WORKER_BASE_ROLE_LABEL: Record<
  AssignableBaseRole,
  string
> = {
  [SUPABASE_WORK_AREA.OPERATIONS]: "Operaciones",
  [SUPABASE_WORK_AREA.RESERVATIONS]: "Reservas",
};

export const WORKER_REGISTRATION_ERROR_COPY: Record<
  WorkerRegistrationErrorCode,
  string
> = {
  [WORKER_REGISTRATION_ERROR_CODE.BASE_ROLE_REQUIRED]:
    "Elija el rol del trabajador.",
  [WORKER_REGISTRATION_ERROR_CODE.FAILED]:
    "No se pudo registrar al trabajador. Intente de nuevo.",
  [WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_LENGTH]:
    "El nombre puede tener hasta 80 caracteres.",
  [WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_REQUIRED]:
    "Escriba el nombre completo.",
  [WORKER_REGISTRATION_ERROR_CODE.NOT_ALLOWED]:
    "Solo la cuenta de administración puede registrar trabajadores.",
  [WORKER_REGISTRATION_ERROR_CODE.USERNAME_FORMAT]:
    "Use solo letras sin tilde, números, punto, guion o guion bajo.",
  [WORKER_REGISTRATION_ERROR_CODE.USERNAME_LENGTH]:
    "El nombre de usuario debe tener entre 3 y 40 caracteres.",
  [WORKER_REGISTRATION_ERROR_CODE.USERNAME_REQUIRED]:
    "Escriba el nombre de usuario.",
  [WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN]:
    "Ese nombre de usuario ya existe. Elija otro.",
};
