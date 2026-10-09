import {
  BLOCKED_REAUTHENTICATION_ERROR_CODES,
  BLOCKED_REAUTHENTICATION_NOTICE_REASON,
  PATHS,
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_INTENT,
  PROFILE_NOTICE,
  PROFILE_NOTICE_QUERY_PARAM,
  SIGN_IN_NOTICE_QUERY_PARAM,
} from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import { isBlockedReauthenticationErrorCode } from "@/app/utils/reauthentication/isBlockedReauthenticationErrorCode";
import {
  REMOVE_INPUT,
  SAVE_INPUT,
} from "./personalEmailForm.constants";

export const REDIRECT_SIGNAL_MESSAGE = "NEXT_REDIRECT";
export const SERVICE_FAILURE_MESSAGE =
  "service unavailable";

export const SUCCESS_CASES = [
  [
    SAVE_INPUT,
    PERSONAL_EMAIL_INTENT.SAVE,
    appendQueryParam(
      PATHS.PROFILE.ROOT,
      PROFILE_NOTICE_QUERY_PARAM,
      PROFILE_NOTICE.EMAIL_SAVED
    ),
  ],
  [
    REMOVE_INPUT,
    PERSONAL_EMAIL_INTENT.REMOVE,
    appendQueryParam(
      PATHS.PROFILE.ROOT,
      PROFILE_NOTICE_QUERY_PARAM,
      PROFILE_NOTICE.EMAIL_REMOVED
    ),
  ],
] as const;

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
  PERSONAL_EMAIL_ERROR_CODE
).filter(
  (code) => !isBlockedReauthenticationErrorCode(code)
);

export const UNKNOWN_ERROR = createPersonalEmailError(
  PERSONAL_EMAIL_ERROR_CODE.UNKNOWN
);
