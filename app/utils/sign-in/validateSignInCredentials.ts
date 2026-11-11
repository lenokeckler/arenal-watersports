import {
  PASSWORD_LENGTH,
  SIGN_IN_ERROR_CODE,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { findUsernameErrorCode } from "@/app/utils/username/findUsernameErrorCode";
import { createSignInError } from "./createSignInError";
import type { SignInCredentials } from "./models/SignInCredentials.interface";
import type { SignInError } from "./models/SignInError.interface";

export const validateSignInCredentials = ({
  password,
  username,
}: SignInCredentials): NullableRef<SignInError> => {
  const usernameErrorCode = findUsernameErrorCode(username);

  if (usernameErrorCode !== null) {
    return createSignInError(usernameErrorCode);
  }

  if (password === STRING.Empty) {
    return createSignInError(
      SIGN_IN_ERROR_CODE.PASSWORD_REQUIRED
    );
  }

  if (password.length > PASSWORD_LENGTH.MAX) {
    return createSignInError(
      SIGN_IN_ERROR_CODE.PASSWORD_TOO_LONG
    );
  }

  return null;
};
