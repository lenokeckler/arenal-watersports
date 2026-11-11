import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import {
  INVALID_ADDRESS,
  OTHER_INTENT,
  REMOVE_INPUT,
  SAVE_INPUT,
} from "./personalEmailForm.constants";

export const WRONG_PASSWORD_ERROR =
  createPersonalEmailError(
    PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
  );

export const INVALID_ADDRESS_INPUT = {
  ...SAVE_INPUT,
  email: INVALID_ADDRESS,
};

export const INVALID_ADDRESS_AND_PASSWORD_INPUT = {
  ...INVALID_ADDRESS_INPUT,
  currentPassword: "",
};

export const INVALID_INTENT_INPUT = {
  ...SAVE_INPUT,
  intent: OTHER_INTENT,
};

export const REMOVE_WITH_INVALID_ADDRESS_INPUT = {
  ...REMOVE_INPUT,
  email: INVALID_ADDRESS,
};

export const EMPTY_PASSWORD_INPUT = {
  ...SAVE_INPUT,
  currentPassword: "",
};
