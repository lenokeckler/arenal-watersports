import {
  PASSWORD_RECOVERY_USERNAME_QUERY_PARAM,
  PATHS,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import { normalizeUsername } from "@/app/utils/username/normalizeUsername";

export const buildPasswordRecoveryResetPath = (
  username: string
): string =>
  appendQueryParam(
    PATHS.ACCESS.RECOVERY_RESET,
    PASSWORD_RECOVERY_USERNAME_QUERY_PARAM,
    normalizeUsername(username)
  );
