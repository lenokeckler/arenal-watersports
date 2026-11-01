import {
  PASSWORD_CHANGE_ERROR_FIELD,
  type PasswordChangeErrorCode,
} from "@/app/constants";
import type { PasswordChangeError } from "./models/PasswordChangeError.interface";

export const createPasswordChangeError = (
  code: PasswordChangeErrorCode
): PasswordChangeError => ({
  code,
  field: PASSWORD_CHANGE_ERROR_FIELD[code],
});
