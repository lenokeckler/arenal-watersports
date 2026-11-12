import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants/access/PasswordChangeError.constants";
import type { PasswordChangeErrorCopy } from "../models/PasswordChangeErrorCopy.type";
import { FIRST_SIGN_IN_ERROR_COPY } from "./FirstSignInErrorCopy.constants";

export const PROFILE_PASSWORD_ERROR_COPY: PasswordChangeErrorCopy =
  {
    ...FIRST_SIGN_IN_ERROR_COPY,
    [PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID]:
      "La contraseña actual no es correcta.",
    [PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_REQUIRED]:
      "Escriba su contraseña actual.",
    [PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT]:
      "La contraseña nueva debe ser distinta de la actual.",
  };
