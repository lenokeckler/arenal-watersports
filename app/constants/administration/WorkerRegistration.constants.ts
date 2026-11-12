import { SUPABASE_WORK_AREA } from "../supabase/SupabaseWorkArea.constants";

export const WORKER_REGISTRATION_FIELD = {
  BASE_ROLE: "baseRole",
  FORM: "form",
  FULL_NAME: "fullName",
  USERNAME: "username",
} as const;

export type WorkerRegistrationField =
  (typeof WORKER_REGISTRATION_FIELD)[keyof typeof WORKER_REGISTRATION_FIELD];

export const WORKER_FULL_NAME_LENGTH = {
  MAX: 80,
} as const;

export const WORKER_USERNAME_PATTERN = /^[a-z0-9._-]+$/;

export const WORKER_FULL_NAME_SPACES_PATTERN = /\s+/g;

export const ASSIGNABLE_BASE_ROLES = [
  SUPABASE_WORK_AREA.RESERVATIONS,
  SUPABASE_WORK_AREA.OPERATIONS,
] as const;

export type AssignableBaseRole =
  (typeof ASSIGNABLE_BASE_ROLES)[number];

export const WORKER_REGISTRATION_ERROR_CODE = {
  BASE_ROLE_REQUIRED: "base_role_required",
  FAILED: "registration_failed",
  FULL_NAME_LENGTH: "full_name_length",
  FULL_NAME_REQUIRED: "full_name_required",
  NOT_ALLOWED: "registration_not_allowed",
  USERNAME_FORMAT: "username_format",
  USERNAME_LENGTH: "username_length",
  USERNAME_REQUIRED: "username_required",
  USERNAME_TAKEN: "username_taken",
} as const;

export type WorkerRegistrationErrorCode =
  (typeof WORKER_REGISTRATION_ERROR_CODE)[keyof typeof WORKER_REGISTRATION_ERROR_CODE];
