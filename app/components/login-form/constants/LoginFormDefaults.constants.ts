import { STRING } from "@/app/constants";
import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { SignInFieldErrors } from "../models/SignInFieldErrors.type";

export const EMPTY_SIGN_IN_CREDENTIALS: SignInCredentials =
  {
    password: STRING.Empty,
    username: STRING.Empty,
  };

export const NO_SIGN_IN_FIELD_ERRORS: SignInFieldErrors = {
  [SIGN_IN_FIELD.FORM]: null,
  [SIGN_IN_FIELD.PASSWORD]: null,
  [SIGN_IN_FIELD.USERNAME]: null,
};
