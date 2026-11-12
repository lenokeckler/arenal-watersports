import type { WorkArea } from "@/app/types";
import { SUPABASE_WORK_AREA } from "../supabase/SupabaseWorkArea.constants";

export const GRANTABLE_WORKER_AREAS = [
  SUPABASE_WORK_AREA.RESERVATIONS,
  SUPABASE_WORK_AREA.OPERATIONS,
] as const satisfies readonly WorkArea[];

export type GrantableWorkerArea =
  (typeof GRANTABLE_WORKER_AREAS)[number];

export const WORKER_AREA_INTENT = {
  GRANT: "grant",
  REVOKE: "revoke",
} as const;

export type WorkerAreaIntent =
  (typeof WORKER_AREA_INTENT)[keyof typeof WORKER_AREA_INTENT];

export const WORKER_AREA_CHANGE_RESULT = {
  AREA_NOT_GRANTABLE: "area_not_grantable",
  BASE_AREA: "base_area",
  EXTERNAL_GUIDE: "external_guide",
  FAILED: "failed",
  GRANTED: "granted",
  NOT_ALLOWED: "not_allowed",
  NOT_FOUND: "not_found",
  REVOKED: "revoked",
} as const;

export type WorkerAreaChangeResult =
  (typeof WORKER_AREA_CHANGE_RESULT)[keyof typeof WORKER_AREA_CHANGE_RESULT];

export const WORKER_AREA_FIELD = {
  AREA: "area",
  INTENT: "intent",
  NOTICE: "notice",
  USERNAME: "username",
  WORKER_ID: "workerId",
} as const;
