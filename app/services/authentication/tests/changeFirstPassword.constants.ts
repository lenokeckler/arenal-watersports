import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";

export const TEMPORARY_PASSWORD_REJECTION =
  createPasswordChangeError(
    PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS
  );

export const PASSWORD_UPDATE_REJECTION =
  createPasswordChangeError(
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES
  );
