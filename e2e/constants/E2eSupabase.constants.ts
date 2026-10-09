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
  WORKER_AREAS: "worker_areas",
  WORKER_MARKS: "worker_marks",
  WORKERS: "workers",
} as const;

export const E2E_SUPABASE_COLUMN = {
  FAILED_ATTEMPTS: "failed_attempts",
  ID: "id",
  STATUS: "status",
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

export const E2E_AUTH_SESSIONS = {
  DATABASE: "postgres",
  DATABASE_CONTAINER: "supabase_db_arenal-watersports",
  DATABASE_USER: "postgres",
  QUERY:
    "select count(*) from auth.sessions where user_id = :'uid'",
  USER_ID_VARIABLE: "uid",
} as const;
