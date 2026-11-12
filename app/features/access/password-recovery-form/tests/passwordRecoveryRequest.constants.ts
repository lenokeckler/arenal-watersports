import {
  PASSWORD_RECOVERY_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { createPasswordRecoveryError } from "@/app/utils/password-recovery/createPasswordRecoveryError";

export const RAW_USERNAME = "  Ana.Perez\t";
export const INJECTED_USERNAME = "ana&username=admin#x";
export const SHORT_USERNAME = "ab";
export const NETWORK_KEY = "a".repeat(64);
export const SERVICE_FAILURE_MESSAGE =
  "service unavailable";
export const NETWORK_KEY_FAILURE_MESSAGE =
  "network key secret missing";
export const FIRST_INVALID_SUBMIT = 1;
export const NO_INVALID_SUBMITS = 0;
export const FIELD_ERROR_TEXT = "field error";

export const UNKNOWN_ERROR = createPasswordRecoveryError(
  PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
);
export const USERNAME_REQUIRED_ERROR =
  createPasswordRecoveryError(
    PASSWORD_RECOVERY_ERROR_CODE.USERNAME_REQUIRED
  );
export const USERNAME_LENGTH_ERROR =
  createPasswordRecoveryError(
    PASSWORD_RECOVERY_ERROR_CODE.USERNAME_LENGTH
  );
export const TOO_MANY_REQUESTS_ERROR =
  createPasswordRecoveryError(
    PASSWORD_RECOVERY_ERROR_CODE.TOO_MANY_REQUESTS
  );
export const NETWORK_ERROR = createPasswordRecoveryError(
  PASSWORD_RECOVERY_ERROR_CODE.NETWORK
);

export const RETURNED_ERRORS = [
  USERNAME_REQUIRED_ERROR,
  USERNAME_LENGTH_ERROR,
  TOO_MANY_REQUESTS_ERROR,
  UNKNOWN_ERROR,
] as const;

export const EMPTY_USERNAME = STRING.Empty;
