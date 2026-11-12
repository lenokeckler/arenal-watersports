import {
  SUPABASE_WORK_AREA,
  SUPABASE_WORKER_MARK,
  WORK_AREA_LABEL,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import type { WorkerListBaseRole } from "@/app/services/worker-list/models/WorkerListBaseRole.type";
import type { WorkerListStatus } from "@/app/services/worker-list/models/WorkerListStatus.type";
import type { WorkerMark } from "@/app/constants/supabase/SupabaseWorkerMark.constants";

export const WORKER_LIST_COPY = {
  ACTIVE: "Activo",
  COLUMNS: {
    ADDITIONAL_AREAS: "Áreas adicionales",
    BASE_ROLE: "Rol base",
    EXPIRY_DATE: "Fecha de caducidad",
    FULL_NAME: "Nombre",
    MARKS: "Marcas",
    STATUS: "Estado",
    USERNAME: "Usuario",
  },
  EMPTY: "No se encontraron trabajadores.",
  EMPTY_VALUE: "Ninguna",
  EXTERNAL_GUIDE: "Guía externo",
  FILTER_ALL: "Todos",
  FILTER_APPLY: "Aplicar filtros",
  FILTER_APPLY_PENDING: "Aplicando filtros...",
  FILTER_ROLE_LABEL: "Rol base",
  FILTER_STATUS_LABEL: "Estado",
  INACTIVE: "Inactivo",
  INSTRUCTION:
    "Consulte las cuentas y los permisos de cada trabajador.",
  METADATA_TITLE:
    "Lista de trabajadores — Arenal Water Sports",
  NO_EXPIRY: "Sin caducidad",
  PAGINATION_NAV_LABEL: "Paginación de trabajadores",
  TEMPORARY_GUIDE_ACTIVE: "Vigente",
  TEMPORARY_GUIDE_INACTIVE: "Inhabilitada",
  TITLE: "Lista de trabajadores",
} as const;

export const WORKER_LIST_COLUMNS = [
  WORKER_LIST_COPY.COLUMNS.FULL_NAME,
  WORKER_LIST_COPY.COLUMNS.USERNAME,
  WORKER_LIST_COPY.COLUMNS.BASE_ROLE,
  WORKER_LIST_COPY.COLUMNS.ADDITIONAL_AREAS,
  WORKER_LIST_COPY.COLUMNS.MARKS,
  WORKER_LIST_COPY.COLUMNS.EXPIRY_DATE,
  WORKER_LIST_COPY.COLUMNS.STATUS,
] as const;

export const WORKER_LIST_MARK_LABEL: Record<
  WorkerMark,
  string
> = {
  [SUPABASE_WORKER_MARK.EXTERNAL_GUIDE_REGISTRATION]:
    "Registro de guías externos",
  [SUPABASE_WORKER_MARK.GENERAL_MANAGER]:
    "Encargado general",
  [SUPABASE_WORKER_MARK.GUIDE]: "Guía",
};

export const WORKER_LIST_ROLE_LABEL: Record<
  WorkerListBaseRole,
  string
> = {
  [SUPABASE_WORK_AREA.ADMINISTRATION]:
    WORK_AREA_LABEL[SUPABASE_WORK_AREA.ADMINISTRATION],
  [SUPABASE_WORK_AREA.OPERATIONS]:
    WORK_AREA_LABEL[SUPABASE_WORK_AREA.OPERATIONS],
  [SUPABASE_WORK_AREA.RESERVATIONS]:
    WORK_AREA_LABEL[SUPABASE_WORK_AREA.RESERVATIONS],
};

export const WORKER_LIST_STATUS_LABEL: Record<
  WorkerListStatus,
  string
> = {
  [WORKER_LIST_STATUS.ACTIVE]: WORKER_LIST_COPY.ACTIVE,
  [WORKER_LIST_STATUS.INACTIVE]: WORKER_LIST_COPY.INACTIVE,
};
