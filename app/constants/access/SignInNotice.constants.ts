import {
  SIGN_IN_ERROR_CODE,
  type SignInErrorCode,
} from "./SignInError.constants";

export const SIGN_IN_NOTICE_QUERY_PARAM = "reason";

export const SIGN_IN_NOTICE_REASON = {
  BLOCKED_BY_ADMINISTRATION: "blocked-administration",
  BLOCKED_BY_ATTEMPTS: "blocked-attempts",
  INACTIVE: "inactive",
} as const;

export type SignInNoticeReason =
  (typeof SIGN_IN_NOTICE_REASON)[keyof typeof SIGN_IN_NOTICE_REASON];

export const SIGN_IN_NOTICE_ERROR_CODE: Record<
  SignInNoticeReason,
  SignInErrorCode
> = {
  [SIGN_IN_NOTICE_REASON.BLOCKED_BY_ADMINISTRATION]:
    SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
  [SIGN_IN_NOTICE_REASON.BLOCKED_BY_ATTEMPTS]:
    SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
  [SIGN_IN_NOTICE_REASON.INACTIVE]:
    SIGN_IN_ERROR_CODE.SESSION_INACTIVE,
};
