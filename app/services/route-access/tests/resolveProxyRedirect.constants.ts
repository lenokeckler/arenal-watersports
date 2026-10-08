import { PATHS } from "@/app/constants";

export const PROTECTED_PATHNAME = "/board";

const RECOVERY_PATHNAME = "/access/recovery";

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
  RECOVERY_PATHNAME,
] as const;

export const SIGNED_OUT = {
  hasSession: false,
  mustChangePassword: false,
} as const;

export const SIGNED_IN = {
  hasSession: true,
  mustChangePassword: false,
} as const;

export const PENDING_PASSWORD = {
  hasSession: true,
  mustChangePassword: true,
} as const;

const GATED_PATHS = [
  ...PROTECTED_PATHS,
  PATHS.ACCESS.ROOT,
  RECOVERY_PATHNAME,
] as const;

export const GATE_MATRIX = [
  ...PROTECTED_PATHS.map(
    (pathname) =>
      [SIGNED_OUT, pathname, PATHS.ACCESS.LOGIN] as const
  ),
  ...PRE_LOGIN_PATHS.map(
    (pathname) => [SIGNED_OUT, pathname, null] as const
  ),
  [
    SIGNED_OUT,
    PATHS.ACCESS.FIRST_SIGN_IN,
    PATHS.ACCESS.LOGIN,
  ],
  ...[...PROTECTED_PATHS, ...PRE_LOGIN_PATHS].map(
    (pathname) => [SIGNED_IN, pathname, null] as const
  ),
  [SIGNED_IN, PATHS.ACCESS.FIRST_SIGN_IN, PATHS.HOME],
  ...GATED_PATHS.map(
    (pathname) =>
      [
        PENDING_PASSWORD,
        pathname,
        PATHS.ACCESS.FIRST_SIGN_IN,
      ] as const
  ),
  [PENDING_PASSWORD, PATHS.ACCESS.FIRST_SIGN_IN, null],
  [PENDING_PASSWORD, PATHS.ACCESS.LOGIN, null],
] as const;
