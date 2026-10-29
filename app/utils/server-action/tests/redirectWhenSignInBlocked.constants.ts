import {
  BLOCKED_REAUTHENTICATION_ERROR_CODES,
  BLOCKED_REAUTHENTICATION_NOTICE_REASON,
  PATHS,
  REAUTHENTICATION_ERROR_CODE,
  SIGN_IN_NOTICE_QUERY_PARAM,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import { isBlockedReauthenticationErrorCode } from "@/app/utils/reauthentication/isBlockedReauthenticationErrorCode";

export const BLOCKED_LOGIN_CASES =
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

export const NOT_BLOCKED_CODES = Object.values(
  REAUTHENTICATION_ERROR_CODE
).filter(
  (code) => !isBlockedReauthenticationErrorCode(code)
);
