import { PATHS } from "@/app/constants";

export const E2E_SYSTEM_ROUTES = [
  PATHS.HOME,
  PATHS.PROFILE.ROOT,
  PATHS.PROFILE.PASSWORD,
  PATHS.PROFILE.EMAIL,
] as const;

export const E2E_PRE_LOGIN_ROUTES = [
  PATHS.ACCESS.LOGIN,
  PATHS.ACCESS.FIRST_SIGN_IN,
  PATHS.ACCESS.RECOVERY,
  PATHS.ACCESS.RECOVERY_RESET,
] as const;

export const E2E_PRESENCE_COUNT = {
  EXACTLY_ONE: 1,
  NONE: 0,
} as const;

export const E2E_FULL_VISIBILITY_RATIO = 1;

export const E2E_RECOVERY_PREFILL_USERNAME =
  "presence.check";

export const E2E_PAGE_FILE_NAME = "page.tsx";

export const E2E_APP_DIRECTORY = {
  ACCESS: "app/access",
  SYSTEM: "app/(system)",
} as const;

export const E2E_ROUTE_GROUP_PATTERN = /^\(.*\)$/;

export const E2E_ROUTE_SEPARATOR = "/";
