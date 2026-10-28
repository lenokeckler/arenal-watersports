import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { isCommonPassword } from "./isCommonPassword";

export const validatePasswordNotCommon = (
  password: string
): NullableRef<PasswordChangeError> =>
  isCommonPassword(password)
    ? createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_COMMON
      )
    : null;
