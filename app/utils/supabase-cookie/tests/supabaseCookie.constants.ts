import { SUPABASE_AUTH_COOKIE } from "@/app/constants";

const NAME = SUPABASE_AUTH_COOKIE.NAME;

export const COOKIE_FIXTURE = {
  NAME,
  FIRST_CHUNK: `${NAME}.0`,
  SECOND_CHUNK: `${NAME}.1`,
  OTHER_PROJECT: "sb-other-auth-token",
  SUFFIXED: `${NAME}-x`,
  UNRELATED: "theme",
  VALUE_CONTAINING_NAME: `theme=${NAME}`,
  EXPIRY_ATTRIBUTES: SUPABASE_AUTH_COOKIE.EXPIRY_ATTRIBUTES,
  ROOT_PATH: "path=/",
  NON_NUMERIC_CHUNK: `${NAME}.abc`,
} as const;

export const LEGACY_FIXTURE = {
  HOSTED_URL: "https://abcdref.supabase.co",
  HOSTED_NAME: "sb-abcdref-auth-token",
  LOCAL_URL: "http://127.0.0.1:54321",
  LOCAL_NAME: "sb-127-auth-token",
  DOTLESS_URL: "http://localhost:3000",
  DOTLESS_NAME: "sb-localhost-auth-token",
  FIRST_CHUNK_SUFFIX: ".0",
  SECOND_CHUNK_SUFFIX: ".1",
  NON_NUMERIC_SUFFIX: ".abc",
  OTHER_PROJECT_NAME: "sb-other-auth-token",
} as const;
