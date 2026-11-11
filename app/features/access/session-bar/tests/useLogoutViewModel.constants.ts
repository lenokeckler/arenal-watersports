import type { SignOutThisDeviceResult } from "@/app/services/authentication/models/SignOutThisDeviceResult.interface";

export const SIGNED_OUT_LOGIN_PATH =
  "/access/login?notice=signed-out";

export const SIGN_OUT_OK: SignOutThisDeviceResult = {
  ok: true,
};

export const SIGN_OUT_REFUSED: SignOutThisDeviceResult = {
  ok: false,
};

export const SIGN_OUT_FAILURE = new Error(
  "sign-out failed"
);

export const TIMER_COUNT = {
  NONE: 0,
  ONE: 1,
} as const;

export const ONE_MILLISECOND = 1;
export const SIGN_OUT_CALL_COUNT = {
  TWO: 2,
} as const;
