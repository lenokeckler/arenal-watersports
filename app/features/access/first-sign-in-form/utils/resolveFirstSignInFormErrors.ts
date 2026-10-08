import type { NullableRef } from "@/app/types";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";
import { validateFirstPasswordChange } from "@/app/utils/first-sign-in/validateFirstPasswordChange";
import { NO_FIRST_SIGN_IN_FORM_ERRORS } from "../constants/FirstSignInDefaults.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import type { FirstSignInFormErrorSources } from "../models/FirstSignInFormErrorSources.interface";
import type { FirstSignInFormErrors } from "../models/FirstSignInFormErrors.type";

const placeError = (
  errors: FirstSignInFormErrors,
  error: NullableRef<FirstSignInError>
): FirstSignInFormErrors =>
  error
    ? {
        ...errors,
        [error.field]: FIRST_SIGN_IN_ERROR_COPY[error.code],
      }
    : errors;

export const resolveFirstSignInFormErrors = ({
  hasSubmitted,
  serverError,
  values,
}: FirstSignInFormErrorSources): FirstSignInFormErrors => {
  const validationError = hasSubmitted
    ? validateFirstPasswordChange(values)
    : null;

  return placeError(
    placeError(
      NO_FIRST_SIGN_IN_FORM_ERRORS,
      validationError
    ),
    serverError
  );
};
