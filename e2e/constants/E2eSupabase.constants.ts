export const E2E_SUPABASE_ENV = {
  ANON_KEY: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  SERVICE_ROLE_KEY: "SUPABASE_SERVICE_ROLE_KEY",
  URL: "NEXT_PUBLIC_SUPABASE_URL",
} as const;

export const E2E_LOCAL_SUPABASE_HOSTS: readonly string[] = [
  "127.0.0.1",
  "localhost",
];

export const E2E_SUPABASE_CLIENT_OPTIONS = {
  auth: { autoRefreshToken: false, persistSession: false },
} as const;

export const E2E_SUPABASE_ERROR = {
  MISSING_ENV: (name: string): string =>
    `E2E needs ${name} in the environment or .env.local.`,
  NOT_LOCAL: (host: string): string =>
    `E2E only runs against the local Supabase, not ${host}.`,
} as const;
