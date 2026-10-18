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
} as const;
