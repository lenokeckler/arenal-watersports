import { STRING } from "@/app/constants";
import { findUsernameErrorCode } from "@/app/utils/username/findUsernameErrorCode";
import { normalizeUsername } from "@/app/utils/username/normalizeUsername";

export const resolvePasswordRecoveryPrefill = (
  queryValue: string | string[] | undefined
): string => {
  if (typeof queryValue !== "string") {
    return STRING.Empty;
  }

  const username = normalizeUsername(queryValue);

  return findUsernameErrorCode(username) === null
    ? username
    : STRING.Empty;
};
