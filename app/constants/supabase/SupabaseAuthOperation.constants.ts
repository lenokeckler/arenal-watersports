export const SUPABASE_AUTH_OPERATION = {
  DELETE_USER: "auth.admin.deleteUser",
  GET_CLAIMS: "auth.getClaims",
  GET_USER: "auth.getUser",
  REFRESH_SESSION: "auth.refreshSession",
  SIGN_OUT_EVERYWHERE: "auth.signOut.global",
  SIGN_OUT_THROWAWAY: "auth.signOut.throwaway",
} as const;
