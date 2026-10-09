import type { SignInNoticeReason } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { BLOCKED_SIGN_IN_NOTICE_REASON } from "../constants/BlockedSignInNotice.constants";

export const resolveBlockedSignInNoticeReason = ({
  code,
}: PasswordChangeError): NullableRef<SignInNoticeReason> =>
  BLOCKED_SIGN_IN_NOTICE_REASON[code] ?? null;
