import {
  PASSWORD_CHANGE_ERROR_CODE,
  type BlockedReauthenticationErrorCode,
} from "./PasswordChangeError.constants";
import {
  SIGN_IN_NOTICE_REASON,
  type SignInNoticeReason,
} from "./SignInNotice.constants";

export const BLOCKED_REAUTHENTICATION_NOTICE_REASON: Record<
  BlockedReauthenticationErrorCode,
  SignInNoticeReason
> = {
  [PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION]:
    SIGN_IN_NOTICE_REASON.BLOCKED_BY_ADMINISTRATION,
  [PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS]:
    SIGN_IN_NOTICE_REASON.BLOCKED_BY_ATTEMPTS,
};

export const BLOCKED_REAUTHENTICATION_ERROR_CODES =
  Object.keys(
    BLOCKED_REAUTHENTICATION_NOTICE_REASON
  ) as BlockedReauthenticationErrorCode[];
