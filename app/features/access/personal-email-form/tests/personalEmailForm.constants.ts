import { PERSONAL_EMAIL_INTENT } from "@/app/constants";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";
import {
  PASSWORD,
  VALID_ADDRESS,
} from "@/app/utils/personal-email/tests/personalEmail.constants";

export const SAVE_INPUT: PersonalEmailChangeInput = {
  currentPassword: PASSWORD,
  email: VALID_ADDRESS,
  intent: PERSONAL_EMAIL_INTENT.SAVE,
};

export const REMOVE_INPUT: PersonalEmailChangeInput = {
  ...SAVE_INPUT,
  intent: PERSONAL_EMAIL_INTENT.REMOVE,
};

export const INVALID_ADDRESS = "ana";
export const OTHER_INTENT = "archive";
export const FORGED_IDENTITY_FIELD = "workerId";
export const FORGED_IDENTITY_VALUE = "someone-else";
export const UPLOADED_FILE_CONTENT = "content";
export const UPLOADED_FILE_NAME = "email.txt";
export const UPPERCASE_SAVE_INTENT = "SAVE";
export const SECOND_ADDRESS = "otra.persona@correo.com";
