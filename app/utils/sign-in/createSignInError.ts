import {
  SIGN_IN_ERROR_FIELD,
  type SignInErrorCode,
} from "@/app/constants";
import type { SignInError } from "./models/SignInError.interface";

export const createSignInError = (
  code: SignInErrorCode
): SignInError => ({
  code,
  field: SIGN_IN_ERROR_FIELD[code],
});
