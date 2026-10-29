import {
  BLOCKED_REAUTHENTICATION_NOTICE_REASON,
  type SignInNoticeReason,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isBlockedReauthenticationErrorCode } from "./isBlockedReauthenticationErrorCode";
import type { CodedError } from "./models/CodedError.interface";

export const resolveBlockedSignInNoticeReason = ({
  code,
}: CodedError): NullableRef<SignInNoticeReason> =>
  isBlockedReauthenticationErrorCode(code)
    ? BLOCKED_REAUTHENTICATION_NOTICE_REASON[code]
    : null;
