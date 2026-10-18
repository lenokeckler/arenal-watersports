import path from "node:path";

export const APP_DIRECTORY = path.join(
  process.cwd(),
  "app"
);

export const SOURCE_FILE_PATTERN = /\.tsx?$/;

export const TEST_PATH_PATTERN = /(^|\/)tests\//;

export const SERVICES_PATH_PATTERN = /^services\//;

export const SERVICE_ROLE_REFERENCE_PATTERN =
  /createServiceRoleSupabaseClient|supabase\/serviceRole/;

export const SERVICE_ROLE_KEY_PATTERN = /SERVICE_ROLE_KEY/;

export const SERVICE_ROLE_KEY_ALLOWED_FILES = [
  "constants/supabase/Supabase.constants.ts",
  "services/supabase/serviceRole.ts",
];

export const CLIENT_SIDE_PATH_PATTERN =
  /^features\/.+\/(hooks|components)\/|\.tsx$/;

export const CLIENT_DIRECTIVE_PATTERN =
  /^\s*["']use client["']/;

export const SERVICES_BARREL_IMPORT_PATTERN =
  /from\s+["']@\/app\/services(\/(supabase|mail))?["']/;

export const SET_WORKER_PASSWORD_PATTERN =
  /setWorkerPassword/;

export const SET_WORKER_PASSWORD_ALLOWED_PATH_PATTERN =
  /^services\/(authentication|password-recovery)\//;

export const TEXT_ENCODING = "utf-8";
