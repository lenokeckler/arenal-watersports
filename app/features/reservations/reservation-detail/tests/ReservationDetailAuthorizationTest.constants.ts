export const RESERVATION_DETAIL_AUTH_TEST = {
  AUTHENTICATED_WORKER_ID: "authenticated-worker",
  ERROR_RESPONSE: {
    code: "XX000",
    details: "",
    hint: "",
    message: "Authorization query failed",
  },
  SUPABASE_ANON_KEY: "test-anon-key",
  SUPABASE_URL: "http://127.0.0.1:54321",
} as const;
