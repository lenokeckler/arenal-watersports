import {
  REAUTHENTICATION_ERROR_CODE,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isPasswordTooLong } from "@/app/utils/password/isPasswordTooLong";
import type { CurrentPasswordErrorCode } from "./models/CurrentPasswordErrorCode.type";

export const validateCurrentPassword = (
  currentPassword: string
): NullableRef<CurrentPasswordErrorCode> => {
  if (currentPassword === STRING.Empty) {
    return REAUTHENTICATION_ERROR_CODE.CURRENT_PASSWORD_REQUIRED;
  }

  if (isPasswordTooLong(currentPassword)) {
    return REAUTHENTICATION_ERROR_CODE.CURRENT_PASSWORD_TOO_LONG;
  }

  return null;
};
