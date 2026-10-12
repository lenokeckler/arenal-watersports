import { PATHS } from "@/app/constants";

export const PROTECTED_PATHNAME = "/board";

export const PROTECTED_PATHS = [
  PATHS.HOME,
  PROTECTED_PATHNAME,
  "/administration/workers",
  "/accessory",
  "/access-private/login",
] as const;

export const PRE_LOGIN_PATHS = [
  PATHS.ACCESS.ROOT,
  PATHS.ACCESS.LOGIN,
  "/access/recovery",
] as const;
