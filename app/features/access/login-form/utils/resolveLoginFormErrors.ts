import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
} from "@/app/constants/access/SignInError.constants";
import { validateSignInCredentials } from "@/app/utils/sign-in/validateSignInCredentials";
import type { LoginFormErrorSources } from "../models/LoginFormErrorSources.interface";
import type { LoginFormErrors } from "../models/LoginFormErrors.interface";
import { resolveSignInFieldErrors } from "./resolveSignInFieldErrors";

export const resolveLoginFormErrors = ({
  fallbackError,
  hasSubmitted,
  serverError,
  values,
}: LoginFormErrorSources): LoginFormErrors => {
  const validationError = hasSubmitted
    ? validateSignInCredentials(values)
    : null;
  const activeError =
    serverError ?? validationError ?? fallbackError;
  const fieldErrors = resolveSignInFieldErrors(activeError);

  return {
    fieldErrors,
    isRecoveryOffered:
      activeError?.code ===
      SIGN_IN_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED,
    passwordError:
      fieldErrors[SIGN_IN_FIELD.PASSWORD] ?? undefined,
    usernameError:
      fieldErrors[SIGN_IN_FIELD.USERNAME] ?? undefined,
  };
};
