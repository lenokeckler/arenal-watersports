import {
  BLOCKED_PASSWORD_CHANGE_NOTICE_REASON,
  type SignInNoticeReason,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isBlockedPasswordChangeErrorCode } from "./isBlockedPasswordChangeErrorCode";
import type { CodedError } from "./models/CodedError.interface";

export const resolveBlockedSignInNoticeReason = ({
  code,
}: CodedError): NullableRef<SignInNoticeReason> =>
  isBlockedPasswordChangeErrorCode(code)
    ? BLOCKED_PASSWORD_CHANGE_NOTICE_REASON[code]
    : null;
