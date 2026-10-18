import { SUPABASE_AUTH_COOKIE } from "@/app/constants";

export const SIGN_OUT_FIXTURE = {
  SESSION: { access_token: "access-token" },
  ERROR_MESSAGE: "session not found",
  NETWORK_FAILURE_MESSAGE: "failed to fetch",
  AUTH_COOKIE_VALUE: "base64-session",
  UNRELATED_COOKIE: "sb-unrelated=keep",
  AUTH_COOKIE_NAME: SUPABASE_AUTH_COOKIE.NAME,
  UNREADABLE_USER_MESSAGE: "user was read",
} as const;
