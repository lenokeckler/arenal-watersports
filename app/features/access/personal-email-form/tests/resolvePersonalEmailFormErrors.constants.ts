import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import {
  INVALID_ADDRESS,
  SAVE_INPUT,
} from "./personalEmailForm.constants";

export const NETWORK_ERROR = createPersonalEmailError(
  PERSONAL_EMAIL_ERROR_CODE.NETWORK
);

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
