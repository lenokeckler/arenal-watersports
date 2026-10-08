export const SUPABASE_AUTH_OPERATION = {
  GET_CLAIMS: "auth.getClaims",
  GET_USER: "auth.getUser",
  REFRESH_SESSION: "auth.refreshSession",
  SIGN_OUT_THROWAWAY: "auth.signOut.throwaway",
} as const;
