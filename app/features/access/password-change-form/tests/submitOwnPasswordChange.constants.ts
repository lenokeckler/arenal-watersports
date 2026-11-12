import {
  BLOCKED_REAUTHENTICATION_ERROR_CODES,
  BLOCKED_REAUTHENTICATION_NOTICE_REASON,
  PASSWORD_CHANGE_ERROR_CODE,
  PATHS,
  PROFILE_NOTICE,
  PROFILE_NOTICE_QUERY_PARAM,
  SIGN_IN_NOTICE_QUERY_PARAM,
} from "@/app/constants";
import { isBlockedReauthenticationErrorCode } from "@/app/utils/reauthentication/isBlockedReauthenticationErrorCode";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";

export const REDIRECT_SIGNAL_MESSAGE = "NEXT_REDIRECT";
export const FORGED_USERNAME_FIELD = "username";
export const FORGED_USERNAME_VALUE = "someone-else";

export const PASSWORD_CHANGED_TARGET = appendQueryParam(
  PATHS.PROFILE.ROOT,
  PROFILE_NOTICE_QUERY_PARAM,
  PROFILE_NOTICE.PASSWORD_CHANGED
);

export const BLOCKED_CASES =
  BLOCKED_REAUTHENTICATION_ERROR_CODES.map(
    (code) =>
      [
        code,
        appendQueryParam(
          PATHS.ACCESS.LOGIN,
          SIGN_IN_NOTICE_QUERY_PARAM,
          BLOCKED_REAUTHENTICATION_NOTICE_REASON[code]
        ),
      ] as const
  );

export const RETURNED_ERROR_CODES = Object.values(
  PASSWORD_CHANGE_ERROR_CODE
).filter(
  (code) => !isBlockedReauthenticationErrorCode(code)
);
