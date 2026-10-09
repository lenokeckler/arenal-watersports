import {
  PASSWORD_CHANGE_ERROR_CODE,
  type BlockedPasswordChangeErrorCode,
} from "./PasswordChangeError.constants";
import {
  SIGN_IN_NOTICE_REASON,
  type SignInNoticeReason,
} from "./SignInNotice.constants";

export const BLOCKED_PASSWORD_CHANGE_NOTICE_REASON: Record<
  BlockedPasswordChangeErrorCode,
  SignInNoticeReason
> = {
  [PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION]:
    SIGN_IN_NOTICE_REASON.BLOCKED_BY_ADMINISTRATION,
  [PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS]:
    SIGN_IN_NOTICE_REASON.BLOCKED_BY_ATTEMPTS,
};

export const BLOCKED_PASSWORD_CHANGE_ERROR_CODES =
  Object.keys(
    BLOCKED_PASSWORD_CHANGE_NOTICE_REASON
  ) as BlockedPasswordChangeErrorCode[];
