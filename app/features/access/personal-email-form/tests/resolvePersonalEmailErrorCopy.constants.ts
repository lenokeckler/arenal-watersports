import { PERSONAL_EMAIL_REQUIRED_COPY } from "../constants/PersonalEmailErrorCopy.constants";
import type { PersonalEmailErrorCopyOptions } from "../models/PersonalEmailErrorCopyOptions.interface";

export const UNREGISTERED_OPTIONS: PersonalEmailErrorCopyOptions =
  { hasEmail: false, isRequired: false };
export const REGISTERED_OPTIONS: PersonalEmailErrorCopyOptions =
  { hasEmail: true, isRequired: false };
export const UNREGISTERED_ADMINISTRATION_OPTIONS: PersonalEmailErrorCopyOptions =
  { hasEmail: false, isRequired: true };
export const ADMINISTRATION_OPTIONS: PersonalEmailErrorCopyOptions =
  { hasEmail: true, isRequired: true };

export const REQUIRED_COPY_CASES = [
  [
    "unregistered",
    UNREGISTERED_OPTIONS,
    PERSONAL_EMAIL_REQUIRED_COPY.UNREGISTERED,
  ],
  [
    "registered",
    REGISTERED_OPTIONS,
    PERSONAL_EMAIL_REQUIRED_COPY.REGISTERED,
  ],
  [
    "administration",
    ADMINISTRATION_OPTIONS,
    PERSONAL_EMAIL_REQUIRED_COPY.ADMINISTRATION,
  ],
  [
    "administration without a registered email",
    UNREGISTERED_ADMINISTRATION_OPTIONS,
    PERSONAL_EMAIL_REQUIRED_COPY.ADMINISTRATION,
  ],
] as const;

export const REMOVE_BUTTON_MENTION = "Quitar";
