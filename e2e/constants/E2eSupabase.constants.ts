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
  RESERVATIONS: "reservations",
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

export const E2E_AUTH_SESSIONS = {
  DATABASE: "postgres",
  DATABASE_USER: "postgres",
  COUNT_QUERY:
    "select count(*) from auth.sessions where user_id = :'uid'",
  DELETE_QUERY:
    "delete from auth.sessions where user_id = :'uid'",
  STOP_ON_ERROR_VARIABLE: "ON_ERROR_STOP=1",
  USER_ID_VARIABLE: "uid",
} as const;

export const E2E_DOCKER = {
  CONTAINER_NAME_PREFIX: "/supabase_db_",
  EXECUTABLE: "docker",
  FORMAT_FLAG: "--format",
  INSPECT_COMMAND: "inspect",
  INSPECTED_METADATA_LINES_PER_CONTAINER: 3,
  INSPECT_FORMAT:
    "{{json .Name}}{{println}}{{json .Config.Labels}}{{println}}{{json .NetworkSettings.Ports}}",
  KONG_API_PORT: "8000",
  KONG_CONTAINER_NAME_PREFIX: "/supabase_kong_",
  PORT_PROTOCOL: "tcp",
  PROJECT_LABEL: "com.supabase.cli.project",
  PS_COMMAND: "ps",
  QUIET_FLAG: "-q",
  WORKDIR_LABEL: "com.supabase.cli.workdir",
} as const;

export const E2E_DATABASE_RESOLVER = {
  ACTION: "resolve the local database container",
  AMBIGUOUS_GATEWAY_FOR_URL: (port: string): string =>
    `More than one local Supabase API gateway publishes port ${port}.`,
  DOCKER_COMMAND_FAILED: (reason: string): string =>
    `Docker could not inspect the local Supabase containers: ${reason}`,
  EMPTY_CONTAINER_LIST:
    "Docker returned no running containers.",
  INVALID_DOCKER_OUTPUT:
    "Docker returned invalid container metadata.",
  MISSING_DATABASE_CONTAINER: (project: string): string =>
    `No database container was found for the local Supabase project ${project}.`,
  MISSING_PROJECT_METADATA:
    "The local Supabase container does not include the required project labels.",
  MISSING_URL_PORT:
    "The local Supabase URL must include its API port.",
  NO_GATEWAY_FOR_URL: (port: string): string =>
    `No local Supabase API gateway publishes port ${port}.`,
  NON_LOCAL_URL: (host: string): string =>
    `E2E only runs against the local Supabase, not ${host}.`,
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
