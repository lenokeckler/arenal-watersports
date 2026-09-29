import {
  PASSWORD_LENGTH,
  SIGN_IN_ERROR_CODE,
  STRING,
  USERNAME,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { getPasswordByteLength } from "@/app/utils/password/getPasswordByteLength";
import { normalizeUsername } from "@/app/utils/username/normalizeUsername";
import { createSignInError } from "./createSignInError";
import type { SignInCredentials } from "./models/SignInCredentials.interface";
import type { SignInError } from "./models/SignInError.interface";

export const validateSignInCredentials = ({
  password,
  username,
}: SignInCredentials): NullableRef<SignInError> => {
  const normalizedUsername = normalizeUsername(username);

  if (normalizedUsername === STRING.Empty) {
    return createSignInError(
      SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
    );
  }

  if (
    normalizedUsername.length < USERNAME.LENGTH.MIN ||
    normalizedUsername.length > USERNAME.LENGTH.MAX
  ) {
    return createSignInError(
      SIGN_IN_ERROR_CODE.USERNAME_LENGTH
    );
  }

  if (password === STRING.Empty) {
    return createSignInError(
      SIGN_IN_ERROR_CODE.PASSWORD_REQUIRED
    );
  }

  if (
    getPasswordByteLength(password) > PASSWORD_LENGTH.MAX
  ) {
    return createSignInError(
      SIGN_IN_ERROR_CODE.PASSWORD_TOO_LONG
    );
  }

  return null;
};
