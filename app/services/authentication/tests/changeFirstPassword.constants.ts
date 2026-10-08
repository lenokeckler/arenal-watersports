import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createFirstSignInError } from "@/app/utils/first-sign-in/createFirstSignInError";

export const TEMPORARY_PASSWORD_REJECTION =
  createFirstSignInError(
    FIRST_SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS
  );

export const PASSWORD_UPDATE_REJECTION =
  createFirstSignInError(
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES
  );
