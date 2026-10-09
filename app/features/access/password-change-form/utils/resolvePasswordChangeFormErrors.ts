import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { validatePasswordChange } from "@/app/utils/password-change/validatePasswordChange";
import { NO_PASSWORD_CHANGE_FORM_ERRORS } from "../constants/PasswordChangeDefaults.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import type { PasswordChangeFormErrorSources } from "../models/PasswordChangeFormErrorSources.interface";
import type { PasswordChangeFormErrors } from "../models/PasswordChangeFormErrors.type";

const placeError = (
  errors: PasswordChangeFormErrors,
  error: NullableRef<PasswordChangeError>
): PasswordChangeFormErrors =>
  error
    ? {
        ...errors,
        [error.field]: FIRST_SIGN_IN_ERROR_COPY[error.code],
      }
    : errors;

export const resolvePasswordChangeFormErrors = ({
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
      validationError
    ),
    serverError
  );
};
