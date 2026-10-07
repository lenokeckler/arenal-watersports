import {
  SIGN_IN_ERROR_CODE,
  type SignInErrorCode,
} from "./SignInError.constants";

export const SIGN_IN_HOOK_REJECTION = {
  BLOCKED_BY_ADMINISTRATION:
    "account_blocked:administration",
  BLOCKED_BY_ATTEMPTS: "account_blocked:failed_attempts",
  UNAVAILABLE: "account_unavailable",
} as const;

export type SignInHookRejection =
  (typeof SIGN_IN_HOOK_REJECTION)[keyof typeof SIGN_IN_HOOK_REJECTION];

export const SIGN_IN_HOOK_REJECTION_ERROR_CODE: Record<
  SignInHookRejection,
  SignInErrorCode
> = {
  [SIGN_IN_HOOK_REJECTION.BLOCKED_BY_ADMINISTRATION]:
    SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
  [SIGN_IN_HOOK_REJECTION.BLOCKED_BY_ATTEMPTS]:
    SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
  [SIGN_IN_HOOK_REJECTION.UNAVAILABLE]:
    SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS,
};
