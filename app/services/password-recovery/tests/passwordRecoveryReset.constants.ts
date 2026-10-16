import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";

export const RESET_WORKER_ID =
  "00000000-0000-0000-0000-0000000000b2";
export const RESET_NEW_PASSWORD = "Brisa-Del-Lago-2026";
export const RESET_WEAK_PASSWORD = "abc";
export const RESET_MISMATCHED_PASSWORD =
  "Otra-Brisa-Del-Lago-2026";
export const RESET_UNNORMALIZED_PIN = " 482 913 ";
export const RESET_NORMALIZED_PIN = "482913";
export const RESET_PERSONAL_EMAIL =
  "worker.one@example.com";
export const RESET_MAIL_FAILURE_MESSAGE = "mail failed";
export const RESET_EMAIL_READ_FAILURE_MESSAGE =
  "email read failed";
export const RESET_SET_FAILURE_MESSAGE = "admin api down";
export const RESET_FINISH_FAILURE_MESSAGE = "finish failed";

export const RESET_INPUT = {
  confirmPassword: RESET_NEW_PASSWORD,
  newPassword: RESET_NEW_PASSWORD,
  pin: RESET_UNNORMALIZED_PIN,
  username: "  Worker.One ",
};

export const RULES_PASSWORD_ERROR =
  createPasswordChangeError(
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES
  );
export const OTHER_PASSWORD_ERROR =
  createPasswordChangeError(
    PASSWORD_CHANGE_ERROR_CODE.SESSION_INACTIVE
  );
export const RESET_SHORT_PIN = "12";
