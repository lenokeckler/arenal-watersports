import {
  WORKER_AREA_CHANGE_RESULT,
  WORKER_AREA_INTENT,
  type WorkerAreaChangeResult,
  type WorkerAreaIntent,
} from "@/app/constants";

export const WORKER_AREAS_COPY = {
  AREA_ENABLED: "Habilitada",
  AREA_IS_BASE: "Área base",
  AREA_NOT_ENABLED: "Sin habilitar",
  AREAS_TITLE: "Áreas de la cuenta",
  BACK: "Volver al inicio",
  EXTERNAL_GUIDE:
    "Las cuentas de guía externo no reciben áreas adicionales.",
  GRANT: "Habilitar",
  GRANTING: "Habilitando…",
  HEADING: "Áreas de un trabajador",
  INSTRUCTION:
    "Busque al trabajador por su nombre de usuario. Puede habilitarle un área completa más o quitársela; el acceso cambia de inmediato.",
  METADATA_TITLE:
    "Áreas de un trabajador — Arenal Water Sports",
  NOT_FOUND:
    "No hay ningún trabajador con ese nombre de usuario.",
  REVOKE: "Quitar",
  REVOKING: "Quitando…",
  SEARCH: "Buscar",
  USERNAME_LABEL: "Nombre de usuario",
  USERNAME_PLACEHOLDER: "Ej. celso.rojas",
  WORKER_SUMMARY: (
    fullName: string,
    username: string
  ): string => `${fullName} · ${username}`,
} as const;

export const WORKER_AREA_CHANGED_NOTICE: Record<
  WorkerAreaIntent,
  (areaLabel: string) => string
> = {
  [WORKER_AREA_INTENT.GRANT]: (areaLabel) =>
    `Se habilitó ${areaLabel}. Al entrar, la persona elige con qué área trabajar.`,
  [WORKER_AREA_INTENT.REVOKE]: (areaLabel) =>
    `Se quitó ${areaLabel}. La persona ya no tiene acceso a esa área.`,
};

export const WORKER_AREA_CHANGE_ERROR: Record<
  WorkerAreaChangeResult,
  string
> = {
  [WORKER_AREA_CHANGE_RESULT.AREA_NOT_GRANTABLE]:
    "Esa área no se puede habilitar.",
  [WORKER_AREA_CHANGE_RESULT.BASE_AREA]:
    "El área base de la cuenta no se quita.",
  [WORKER_AREA_CHANGE_RESULT.EXTERNAL_GUIDE]:
    "Las cuentas de guía externo no reciben áreas adicionales.",
  [WORKER_AREA_CHANGE_RESULT.FAILED]:
    "No se pudo cambiar el área. Intente de nuevo.",
  [WORKER_AREA_CHANGE_RESULT.GRANTED]: "",
  [WORKER_AREA_CHANGE_RESULT.NOT_ALLOWED]:
    "Solo la cuenta de administración puede cambiar áreas.",
  [WORKER_AREA_CHANGE_RESULT.NOT_FOUND]:
    "Esa cuenta ya no existe.",
  [WORKER_AREA_CHANGE_RESULT.REVOKED]: "",
};
