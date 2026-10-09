import {
  BLOCKED_PASSWORD_CHANGE_NOTICE_REASON,
  type BlockedPasswordChangeErrorCode,
  type PasswordChangeErrorCode,
} from "@/app/constants";

export const isBlockedPasswordChangeErrorCode = (
  code: PasswordChangeErrorCode
): code is BlockedPasswordChangeErrorCode =>
  Object.hasOwn(
    BLOCKED_PASSWORD_CHANGE_NOTICE_REASON,
    code
  );
