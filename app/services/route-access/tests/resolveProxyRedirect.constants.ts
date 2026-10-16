import { PATHS } from "@/app/constants";

export const PROTECTED_PATHNAME = "/board";

const UPPERCASE_FIRST_SIGN_IN_PATHNAME =
  "/ACCESS/first-sign-in";

const DOUBLE_SLASH_FIRST_SIGN_IN_PATHNAME =
  "/access//first-sign-in";

const TRAILING_SLASH_FIRST_SIGN_IN_PATHNAME =
  "/access/first-sign-in/";

const UPPERCASE_RECOVERY_RESET_PATHNAME =
  "/ACCESS/Recovery/Reset";

const TRAILING_SLASH_RECOVERY_PATHNAME =
  "/access/recovery/";

const DOUBLE_SLASH_RECOVERY_RESET_PATHNAME =
  "/access//recovery//reset";

const RECOVERY_VARIANT_PATHS = [
  TRAILING_SLASH_RECOVERY_PATHNAME,
  DOUBLE_SLASH_RECOVERY_RESET_PATHNAME,
] as const;

export const PROTECTED_PATHS = [
  PATHS.HOME,
  PROTECTED_PATHNAME,
  "/administration/workers",
  PATHS.PROFILE.ROOT,
  PATHS.PROFILE.PASSWORD,
  PATHS.PROFILE.EMAIL,
  "/accessory",
  "/access-private/login",
] as const;

export const PRE_LOGIN_PATHS = [
  PATHS.ACCESS.ROOT,
  PATHS.ACCESS.LOGIN,
  PATHS.ACCESS.RECOVERY,
  PATHS.ACCESS.RECOVERY_RESET,
] as const;

export const SIGNED_OUT = {
  hasSession: false,
  mustChangePassword: false,
} as const;

export const SIGNED_IN = {
  hasSession: true,
  mustChangePassword: false,
} as const;

export const SIGNED_OUT_WITH_PENDING_CLAIM = {
  hasSession: false,
  mustChangePassword: true,
} as const;

export const PENDING_PASSWORD = {
  hasSession: true,
  mustChangePassword: true,
} as const;

const GATED_PATHS = [
  ...PROTECTED_PATHS,
  PATHS.ACCESS.ROOT,
  PATHS.ACCESS.RECOVERY,
  PATHS.ACCESS.RECOVERY_RESET,
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
  [
    PENDING_PASSWORD,
    UPPERCASE_FIRST_SIGN_IN_PATHNAME,
    PATHS.ACCESS.FIRST_SIGN_IN,
  ],
  ...[
    DOUBLE_SLASH_FIRST_SIGN_IN_PATHNAME,
    TRAILING_SLASH_FIRST_SIGN_IN_PATHNAME,
  ].flatMap((pathname) => [
    [SIGNED_OUT, pathname, PATHS.ACCESS.LOGIN] as const,
    [SIGNED_IN, pathname, PATHS.HOME] as const,
    [PENDING_PASSWORD, pathname, null] as const,
  ]),
  [
    SIGNED_OUT,
    UPPERCASE_RECOVERY_RESET_PATHNAME,
    PATHS.ACCESS.LOGIN,
  ],
  ...RECOVERY_VARIANT_PATHS.flatMap((pathname) => [
    [SIGNED_OUT, pathname, null] as const,
    [SIGNED_IN, pathname, null] as const,
    [
      PENDING_PASSWORD,
      pathname,
      PATHS.ACCESS.FIRST_SIGN_IN,
    ] as const,
  ]),
  [
    SIGNED_OUT_WITH_PENDING_CLAIM,
    PATHS.HOME,
    PATHS.ACCESS.LOGIN,
  ],
  [
    SIGNED_OUT_WITH_PENDING_CLAIM,
    PATHS.ACCESS.FIRST_SIGN_IN,
    PATHS.ACCESS.LOGIN,
  ],
] as const;
