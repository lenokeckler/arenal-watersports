import type { SignOutThisDeviceResult } from "../models/SignOutThisDeviceResult.interface";

export const SIGN_OUT_OK: SignOutThisDeviceResult = {
  ok: true,
};

export const SIGN_OUT_REFUSED: SignOutThisDeviceResult = {
  ok: false,
};

export const SIGN_OUT_FAILURE = new Error(
  "sign-out failed"
);
