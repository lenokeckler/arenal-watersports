import {
  BLOCKED_PASSWORD_CHANGE_NOTICE_REASON,
  type SignInNoticeReason,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isBlockedPasswordChangeErrorCode } from "@/app/utils/password-change/isBlockedPasswordChangeErrorCode";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";

export const resolveBlockedSignInNoticeReason = ({
  code,
}: PasswordChangeError): NullableRef<SignInNoticeReason> =>
  isBlockedPasswordChangeErrorCode(code)
    ? BLOCKED_PASSWORD_CHANGE_NOTICE_REASON[code]
    : null;
