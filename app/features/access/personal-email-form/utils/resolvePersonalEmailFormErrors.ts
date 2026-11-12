import type { NullableRef } from "@/app/types";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";
import { validatePersonalEmailChange } from "@/app/utils/personal-email/validatePersonalEmailChange";
import { NO_PERSONAL_EMAIL_FORM_ERRORS } from "../constants/PersonalEmailFormDefaults.constants";
import type { PersonalEmailErrorCopy } from "../models/PersonalEmailErrorCopy.type";
import type { PersonalEmailFormErrorSources } from "../models/PersonalEmailFormErrorSources.interface";
import type { PersonalEmailFormErrors } from "../models/PersonalEmailFormErrors.type";

const placeError = (
  errors: PersonalEmailFormErrors,
  error: NullableRef<PersonalEmailError>,
  errorCopy: PersonalEmailErrorCopy
): PersonalEmailFormErrors =>
  error
    ? { ...errors, [error.field]: errorCopy[error.code] }
    : errors;

const readValidationError = ({
  hasSubmitted,
  values,
}: PersonalEmailFormErrorSources): NullableRef<PersonalEmailError> => {
  if (!hasSubmitted) {
    return null;
  }

  const validation = validatePersonalEmailChange(values);
  return validation.ok ? null : validation.error;
};

export const resolvePersonalEmailFormErrors = (
  sources: PersonalEmailFormErrorSources
): PersonalEmailFormErrors =>
  placeError(
    placeError(
      NO_PERSONAL_EMAIL_FORM_ERRORS,
      readValidationError(sources),
      sources.errorCopy
    ),
    sources.serverError,
    sources.errorCopy
  );
