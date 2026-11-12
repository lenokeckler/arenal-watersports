import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";

export const CURRENT_PASSWORD_INVALID_ERROR =
  createPasswordChangeError(
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID
  );

export const NEW_PASSWORD_RULES_ERROR =
  createPasswordChangeError(
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES
  );

export const NETWORK_ERROR = createPasswordChangeError(
  PASSWORD_CHANGE_ERROR_CODE.NETWORK
);

export const UNKNOWN_ERROR = createPasswordChangeError(
  PASSWORD_CHANGE_ERROR_CODE.UNKNOWN
);

export const SERVICE_FAILURE_MESSAGE =
  "service unavailable";
