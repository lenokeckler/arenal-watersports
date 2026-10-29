export const E2E_SUPABASE_ENV = {
  ANON_KEY: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  SERVICE_ROLE_KEY: "SUPABASE_SERVICE_ROLE_KEY",
  URL: "NEXT_PUBLIC_SUPABASE_URL",
} as const;

export const E2E_LOCAL_SUPABASE_HOSTS: readonly string[] = [
  "127.0.0.1",
  "localhost",
];

export const E2E_SUPABASE_TABLE = {
  PASSWORD_RESET_PINS: "password_reset_pins",
  PASSWORD_RESET_REQUESTS: "password_reset_requests",
  WORKER_AREAS: "worker_areas",
  WORKER_MARKS: "worker_marks",
  WORKERS: "workers",
} as const;

export const E2E_SUPABASE_COUNT = {
  EXACT: "exact",
} as const;

export const E2E_SUPABASE_FILTER = {
  IS: "is",
} as const;

export const E2E_SUPABASE_COLUMN = {
  BLOCKED_REASON: "blocked_reason",
  CREATED_AT: "created_at",
  EXPIRES_AT: "expires_at",
  DELETED_AT: "deleted_at",
  FAILED_ATTEMPTS: "failed_attempts",
  ID: "id",
  MUST_CHANGE_PASSWORD: "must_change_password",
  PERSONAL_EMAIL: "personal_email",
  STATUS: "status",
  USED_AT: "used_at",
  USERNAME: "username",
  WORKER_ID: "worker_id",
} as const;

export const E2E_WORKER_DEPENDENT_TABLES = [
  {
    column: E2E_SUPABASE_COLUMN.WORKER_ID,
    table: E2E_SUPABASE_TABLE.WORKER_AREAS,
  },
  {
    column: E2E_SUPABASE_COLUMN.WORKER_ID,
    table: E2E_SUPABASE_TABLE.WORKER_MARKS,
  },
  {
    column: E2E_SUPABASE_COLUMN.WORKER_ID,
    table: E2E_SUPABASE_TABLE.PASSWORD_RESET_PINS,
  },
  {
    column: E2E_SUPABASE_COLUMN.ID,
    table: E2E_SUPABASE_TABLE.WORKERS,
  },
] as const;

export const E2E_SUPABASE_CLIENT_OPTIONS = {
  auth: { autoRefreshToken: false, persistSession: false },
} as const;

export const E2E_SUPABASE_ERROR = {
  MISSING_ENV: (name: string): string =>
    `E2E needs ${name} in the environment or .env.local.`,
  NOT_LOCAL: (host: string): string =>
    `E2E only runs against the local Supabase, not ${host}.`,
  OPERATION_FAILED: (
    operation: string,
    reason: string
  ): string => `E2E could not ${operation}: ${reason}`,
  ROLLBACK_OPERATION:
    "delete the auth user after the worker insert failed",
  REASON_SEPARATOR: "; ",
} as const;

const E2E_AUTH_SESSIONS_DATABASE_CONTAINER_ENV =
  "E2E_AUTH_SESSIONS_DATABASE_CONTAINER";
const E2E_AUTH_SESSIONS_DATABASE_CONTAINER_DEFAULT =
  "supabase_db_arenal-watersports";

export const E2E_AUTH_SESSIONS = {
  COUNT_QUERY:
    "select count(*) from auth.sessions where user_id = :'uid'",
  DATABASE: "postgres",
  DATABASE_CONTAINER:
    process.env[E2E_AUTH_SESSIONS_DATABASE_CONTAINER_ENV] ??
    E2E_AUTH_SESSIONS_DATABASE_CONTAINER_DEFAULT,
  DATABASE_USER: "postgres",
  DELETE_QUERY:
    "delete from auth.sessions where user_id = :'uid'",
  STOP_ON_ERROR_VARIABLE: "ON_ERROR_STOP=1",
  USER_ID_VARIABLE: "uid",
} as const;

export const E2E_AUTH_SESSIONS_ERROR = {
  COUNT_OPERATION: "count the auth sessions",
  DELETE_OPERATION: "delete the auth sessions",
  EXEC_FAILED: (
    container: string,
    reason: string
  ): string =>
    `docker exec on ${container} failed: ${reason}`,
  NOT_AN_INTEGER: (output: string): string =>
    `the session count was not an integer: ${output}`,
} as const;

export const E2E_AUTH_ERROR_CODE = {
  SESSION_GONE: "refresh_token_not_found",
} as const;
