import {
  PERSONAL_EMAIL_FIELD,
  STRING,
} from "@/app/constants";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";
import type { PersonalEmailFormErrors } from "../models/PersonalEmailFormErrors.type";

export const EMPTY_PERSONAL_EMAIL_INPUT: PersonalEmailChangeInput =
  {
    currentPassword: STRING.Empty,
    email: STRING.Empty,
    intent: STRING.Empty,
  };

export const NO_PERSONAL_EMAIL_FORM_ERRORS: PersonalEmailFormErrors =
  {
    [PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD]: null,
    [PERSONAL_EMAIL_FIELD.EMAIL]: null,
    [PERSONAL_EMAIL_FIELD.FORM]: null,
  };
