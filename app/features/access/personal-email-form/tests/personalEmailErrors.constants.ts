import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";

export const RECOVERY_REQUIRED_ERROR =
  createPersonalEmailError(
    PERSONAL_EMAIL_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
  );

export const NETWORK_ERROR = createPersonalEmailError(
  PERSONAL_EMAIL_ERROR_CODE.NETWORK
);

export const TOO_MANY_REQUESTS_ERROR =
  createPersonalEmailError(
    PERSONAL_EMAIL_ERROR_CODE.TOO_MANY_REQUESTS
  );

export const UNKNOWN_ERROR = createPersonalEmailError(
  PERSONAL_EMAIL_ERROR_CODE.UNKNOWN
);
