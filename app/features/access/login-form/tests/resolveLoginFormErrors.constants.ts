import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";
import { EMPTY_SIGN_IN_CREDENTIALS } from "../constants/LoginFormDefaults.constants";
import type { LoginFormErrorSources } from "../models/LoginFormErrorSources.interface";

export const INACTIVITY_NOTICE = createSignInError(
  SIGN_IN_ERROR_CODE.SESSION_INACTIVE
);

export const NO_ERROR_SOURCES: LoginFormErrorSources = {
  fallbackError: null,
  hasSubmitted: false,
  notice: null,
  serverError: null,
  values: EMPTY_SIGN_IN_CREDENTIALS,
};
