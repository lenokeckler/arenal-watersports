import {
  FIRST_SIGN_IN_ERROR_FIELD,
  type FirstSignInErrorCode,
} from "@/app/constants";
import type { FirstSignInError } from "./models/FirstSignInError.interface";

export const createFirstSignInError = (
  code: FirstSignInErrorCode
): FirstSignInError => ({
  code,
  field: FIRST_SIGN_IN_ERROR_FIELD[code],
});
