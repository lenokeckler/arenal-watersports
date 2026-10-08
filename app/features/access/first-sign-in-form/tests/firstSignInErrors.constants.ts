import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createFirstSignInError } from "@/app/utils/first-sign-in/createFirstSignInError";

export const CURRENT_PASSWORD_INVALID_ERROR =
  createFirstSignInError(
    FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_INVALID
  );

export const NEW_PASSWORD_RULES_ERROR =
  createFirstSignInError(
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES
  );

export const NETWORK_ERROR = createFirstSignInError(
  FIRST_SIGN_IN_ERROR_CODE.NETWORK
);

export const UNKNOWN_ERROR = createFirstSignInError(
  FIRST_SIGN_IN_ERROR_CODE.UNKNOWN
);
