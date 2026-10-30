import type { WorkArea } from "@/app/types";
import { SUPABASE_WORK_AREA } from "../supabase/SupabaseWorkArea.constants";

export const WORKER_LIST_BASE_ROLES = [
  SUPABASE_WORK_AREA.ADMINISTRATION,
  SUPABASE_WORK_AREA.OPERATIONS,
  SUPABASE_WORK_AREA.RESERVATIONS,
] as const satisfies readonly WorkArea[];

export type WorkerListBaseRole =
  (typeof WORKER_LIST_BASE_ROLES)[number];

export const WORKER_LIST_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type WorkerListStatus =
  (typeof WORKER_LIST_STATUS)[keyof typeof WORKER_LIST_STATUS];

export const WORKER_LIST_QUERY_PARAMETER = {
  PAGE: "page",
  ROLE: "role",
  STATUS: "status",
} as const;

export const WORKER_LIST_PAGE_PATTERN = /^\d+$/;
