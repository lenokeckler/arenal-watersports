export const SUPABASE = {
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  SERVICE_ROLE_KEY:
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
} as const;
