import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { validatePasswordChange } from "@/app/utils/password-change/validatePasswordChange";
import { NO_PASSWORD_CHANGE_FORM_ERRORS } from "../constants/PasswordChangeDefaults.constants";
import type { PasswordChangeErrorCopy } from "../models/PasswordChangeErrorCopy.type";
import type { PasswordChangeFormErrorSources } from "../models/PasswordChangeFormErrorSources.interface";
import type { PasswordChangeFormErrors } from "../models/PasswordChangeFormErrors.type";

const placeError = (
  errors: PasswordChangeFormErrors,
  error: NullableRef<PasswordChangeError>,
  errorCopy: PasswordChangeErrorCopy
): PasswordChangeFormErrors =>
  error
    ? {
        ...errors,
        [error.field]: errorCopy[error.code],
      }
    : errors;

export const resolvePasswordChangeFormErrors = ({
  errorCopy,
  hasSubmitted,
  serverError,
  values,
}: PasswordChangeFormErrorSources): PasswordChangeFormErrors => {
  const validationError = hasSubmitted
    ? validatePasswordChange(values)
    : null;

  return placeError(
    placeError(
      NO_PASSWORD_CHANGE_FORM_ERRORS,
      validationError,
      errorCopy
    ),
    serverError,
    errorCopy
  );
};
