import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
} from "@/app/constants";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";

export const TYPE_ATTRIBUTE = "type";
export const ARIA_INVALID_ATTRIBUTE = "aria-invalid";
export const ARIA_DESCRIBEDBY_ATTRIBUTE =
  "aria-describedby";
export const ARIA_INVALID_VALUE = "true";
export const USERNAME_ERROR_ID = `${SIGN_IN_FIELD.USERNAME}${FIELD_ERROR_ID_SUFFIX}`;
export const PASSWORD_ERROR_ID = `${SIGN_IN_FIELD.PASSWORD}${FIELD_ERROR_ID_SUFFIX}`;

export const INVALID_CREDENTIALS_ERROR = createSignInError(
  SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
);
export const NETWORK_ERROR = createSignInError(
  SIGN_IN_ERROR_CODE.NETWORK
);

export const EXTRA_USERNAME_TEXT = "x";
export const MULTI_CHARACTER_USERNAME = "admin";
