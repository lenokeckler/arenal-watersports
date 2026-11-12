import {
  SIGN_IN_ERROR_CODE,
  STRING,
  USERNAME,
  type UsernameErrorCode,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { normalizeUsername } from "./normalizeUsername";

export const findUsernameErrorCode = (
  username: string
): NullableRef<UsernameErrorCode> => {
  const normalizedUsername = normalizeUsername(username);

  if (normalizedUsername === STRING.Empty) {
    return SIGN_IN_ERROR_CODE.USERNAME_REQUIRED;
  }

  if (
    normalizedUsername.length < USERNAME.LENGTH.MIN ||
    normalizedUsername.length > USERNAME.LENGTH.MAX
  ) {
    return SIGN_IN_ERROR_CODE.USERNAME_LENGTH;
  }

  return null;
};
