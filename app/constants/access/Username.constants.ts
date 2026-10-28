import { SIGN_IN_ERROR_CODE } from "./SignInError.constants";

export const USERNAME = {
  AUTH_EMAIL_DOMAIN: "arenal.local",
  LENGTH: {
    MAX: 40,
    MIN: 3,
  },
} as const;

export type UsernameErrorCode =
  | typeof SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
  | typeof SIGN_IN_ERROR_CODE.USERNAME_LENGTH;
