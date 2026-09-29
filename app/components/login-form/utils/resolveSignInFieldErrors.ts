import type { SignInError } from "@/app/services/authentication/models/SignInError.interface";
import type { NullableRef } from "@/app/types";
import { NO_SIGN_IN_FIELD_ERRORS } from "../constants/LoginFormDefaults.constants";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import type { SignInFieldErrors } from "../models/SignInFieldErrors.type";

export const resolveSignInFieldErrors = (
  error: NullableRef<SignInError>
): SignInFieldErrors =>
  error
    ? {
        ...NO_SIGN_IN_FIELD_ERRORS,
        [error.field]: SIGN_IN_ERROR_COPY[error.code],
      }
    : NO_SIGN_IN_FIELD_ERRORS;
