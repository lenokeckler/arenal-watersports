import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
} from "@/app/constants";
import { createSignInError } from "@/app/services/authentication/createSignInError";

export const TYPE_ATTRIBUTE = "type";
export const ARIA_INVALID_ATTRIBUTE = "aria-invalid";
export const ARIA_DESCRIBEDBY_ATTRIBUTE =
  "aria-describedby";
export const ARIA_INVALID_VALUE = "true";
export const USERNAME_ERROR_ID = `${SIGN_IN_FIELD.USERNAME}-error`;
export const PASSWORD_ERROR_ID = `${SIGN_IN_FIELD.PASSWORD}-error`;
export const PASSWORD_TOGGLE_SHOW_LABEL =
  "Mostrar contraseña";
export const PASSWORD_TOGGLE_HIDE_LABEL =
  "Ocultar contraseña";

export const INVALID_CREDENTIALS_ERROR = createSignInError(
  SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
);
export const NETWORK_ERROR = createSignInError(
  SIGN_IN_ERROR_CODE.NETWORK
);
