import {
  BLOCKED_REAUTHENTICATION_NOTICE_REASON,
  type BlockedReauthenticationErrorCode,
} from "@/app/constants";

export const isBlockedReauthenticationErrorCode = (
  code: string
): code is BlockedReauthenticationErrorCode =>
  Object.hasOwn(
    BLOCKED_REAUTHENTICATION_NOTICE_REASON,
    code
  );
