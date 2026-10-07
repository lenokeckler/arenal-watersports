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

export const CLIENT_DIRECTIVE_PATTERN =
  /^\s*["']use client["']/;

export const SERVICES_BARREL_IMPORT_PATTERN =
  /from\s+["']@\/app\/services(\/supabase)?["']/;

export const TEXT_ENCODING = "utf-8";
