import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import { validatePasswordRecoveryPin } from "@/app/utils/password-recovery/validatePasswordRecoveryPin";
import { NO_PASSWORD_RECOVERY_FORM_ERRORS } from "../constants/PasswordRecoveryRequestDefaults.constants";
import { PASSWORD_RECOVERY_RESET_ERROR_COPY } from "../constants/PasswordRecoveryResetErrorCopy.constants";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryResetErrorSources } from "../models/PasswordRecoveryResetErrorSources.interface";

const placeError = (
  errors: PasswordRecoveryFormErrors,
  error: NullableRef<PasswordRecoveryError>
): PasswordRecoveryFormErrors =>
  error
    ? {
        ...errors,
        [error.field]:
          PASSWORD_RECOVERY_RESET_ERROR_COPY[error.code],
      }
    : errors;

export const resolvePasswordRecoveryResetErrors = ({
  hasSubmitted,
  serverError,
  values,
}: PasswordRecoveryResetErrorSources): PasswordRecoveryFormErrors =>
  placeError(
    placeError(
      NO_PASSWORD_RECOVERY_FORM_ERRORS,
      hasSubmitted
        ? validatePasswordRecoveryPin(values)
        : null
    ),
    serverError
  );
