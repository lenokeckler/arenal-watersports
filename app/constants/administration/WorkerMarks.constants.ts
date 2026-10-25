import {
  SUPABASE_WORKER_MARK,
  type WorkerMark,
} from "../supabase/SupabaseWorkerMark.constants";

export const GRANTABLE_WORKER_MARKS = [
  SUPABASE_WORKER_MARK.GUIDE,
] as const satisfies readonly WorkerMark[];

export type GrantableWorkerMark =
  (typeof GRANTABLE_WORKER_MARKS)[number];

export const WORKER_MARK_CHANGE_RESULT = {
  EXTERNAL_GUIDE: "external_guide",
  FAILED: "failed",
  GRANTED: "granted",
  MARK_NOT_GRANTABLE: "mark_not_grantable",
  NOT_ALLOWED: "not_allowed",
  NOT_FOUND: "not_found",
  REVOKED: "revoked",
} as const;

export type WorkerMarkChangeResult =
  (typeof WORKER_MARK_CHANGE_RESULT)[keyof typeof WORKER_MARK_CHANGE_RESULT];

export const WORKER_MARK_FIELD = {
  MARK: "mark",
  MARK_NOTICE: "markNotice",
} as const;
