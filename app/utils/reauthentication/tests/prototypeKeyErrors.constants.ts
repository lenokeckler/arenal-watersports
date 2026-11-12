import {
  PASSWORD_CHANGE_FIELD,
  type PasswordChangeErrorCode,
} from "@/app/constants";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";

export const PROTOTYPE_KEY_ERRORS: readonly PasswordChangeError[] =
  [
    "__proto__",
    "constructor",
    "toString",
    "hasOwnProperty",
  ].map((key) => ({
    code: key as unknown as PasswordChangeErrorCode,
    field: PASSWORD_CHANGE_FIELD.FORM,
  }));
