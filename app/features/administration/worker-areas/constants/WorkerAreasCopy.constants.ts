import {
  SUPABASE_WORKER_MARK,
  WORKER_AREA_CHANGE_RESULT,
  WORKER_MARK_CHANGE_RESULT,
  type GrantableWorkerMark,
  type WorkerMarkChangeResult,
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
    "Las cuentas de guía externo no reciben áreas ni marcas adicionales.",
  GRANT: "Habilitar",
  MARK_GRANT: "Asignar",
  MARK_GRANTING: "Asignando…",
  MARK_NOT_SET: "Sin asignar",
  MARK_SET: "Asignada",
  MARKS_TITLE: "Marcas de la cuenta",
  GRANTING: "Habilitando…",
  HEADING: "Cuenta de un trabajador",
  INSTRUCTION:
    "Busque al trabajador por su nombre de usuario. Puede bloquear o desbloquear la cuenta, habilitarle un área completa más o asignarle una marca; el acceso cambia de inmediato.",
  METADATA_TITLE:
    "Cuenta de un trabajador — Arenal Water Sports",
  NOT_FOUND:
    "No hay ningún trabajador con ese nombre de usuario.",
  REVOKE: "Quitar",
  REVOKING: "Quitando…",
  RESERVATIONS_REPORT: "Ver reservas por trabajador",
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

export const WORKER_AREA_CHANGE_LABELS = {
  grant: WORKER_AREAS_COPY.GRANT,
  granting: WORKER_AREAS_COPY.GRANTING,
  revoke: WORKER_AREAS_COPY.REVOKE,
  revoking: WORKER_AREAS_COPY.REVOKING,
} as const;

export const WORKER_MARK_CHANGE_LABELS = {
  grant: WORKER_AREAS_COPY.MARK_GRANT,
  granting: WORKER_AREAS_COPY.MARK_GRANTING,
  revoke: WORKER_AREAS_COPY.REVOKE,
  revoking: WORKER_AREAS_COPY.REVOKING,
} as const;

export const WORKER_MARK_LABEL: Record<
  GrantableWorkerMark,
  string
> = {
  [SUPABASE_WORKER_MARK.GENERAL_MANAGER]:
    "Encargado general",
  [SUPABASE_WORKER_MARK.GUIDE]: "Guía",
};

export const WORKER_MARK_DESCRIPTION: Record<
  GrantableWorkerMark,
  string
> = {
  [SUPABASE_WORKER_MARK.GENERAL_MANAGER]:
    "Sube y reemplaza las fotos de estado de las máquinas.",
  [SUPABASE_WORKER_MARK.GUIDE]:
    "Aparece en la lista de guías al asignar un tour.",
};

export const WORKER_MARK_CHANGED_NOTICE: Record<
  WorkerAreaIntent,
  (markLabel: string) => string
> = {
  [WORKER_AREA_INTENT.GRANT]: (markLabel) =>
    `Se asignó la marca ${markLabel}. No cambia su rol ni sus áreas.`,
  [WORKER_AREA_INTENT.REVOKE]: (markLabel) =>
    `Se quitó la marca ${markLabel}.`,
};

export const WORKER_MARK_CHANGE_ERROR: Record<
  WorkerMarkChangeResult,
  string
> = {
  [WORKER_MARK_CHANGE_RESULT.EXTERNAL_GUIDE]:
    "Las cuentas de guía externo no reciben marcas.",
  [WORKER_MARK_CHANGE_RESULT.FAILED]:
    "No se pudo cambiar la marca. Intente de nuevo.",
  [WORKER_MARK_CHANGE_RESULT.GRANTED]: "",
  [WORKER_MARK_CHANGE_RESULT.MARK_NOT_GRANTABLE]:
    "Esa marca no se puede asignar aquí.",
  [WORKER_MARK_CHANGE_RESULT.NOT_ALLOWED]:
    "Solo la cuenta de administración puede cambiar marcas.",
  [WORKER_MARK_CHANGE_RESULT.NOT_FOUND]:
    "Esa cuenta ya no existe.",
  [WORKER_MARK_CHANGE_RESULT.REVOKED]: "",
};
