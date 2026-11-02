import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import { validatePasswordRecoveryRequest } from "@/app/utils/password-recovery/validatePasswordRecoveryRequest";
import { NO_PASSWORD_RECOVERY_FORM_ERRORS } from "../constants/PasswordRecoveryRequestDefaults.constants";
import { PASSWORD_RECOVERY_REQUEST_ERROR_COPY } from "../constants/PasswordRecoveryRequestErrorCopy.constants";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryRequestErrorSources } from "../models/PasswordRecoveryRequestErrorSources.interface";

const placeError = (
  errors: PasswordRecoveryFormErrors,
  error: NullableRef<PasswordRecoveryError>
): PasswordRecoveryFormErrors =>
  error
    ? {
        ...errors,
        [error.field]:
          PASSWORD_RECOVERY_REQUEST_ERROR_COPY[error.code],
      }
    : errors;

export const resolvePasswordRecoveryRequestErrors = ({
  hasSubmitted,
  serverError,
  values,
}: PasswordRecoveryRequestErrorSources): PasswordRecoveryFormErrors =>
  placeError(
    placeError(
      NO_PASSWORD_RECOVERY_FORM_ERRORS,
      hasSubmitted
        ? validatePasswordRecoveryRequest(values)
        : null
    ),
    serverError
  );
