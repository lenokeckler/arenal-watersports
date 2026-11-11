import {
  PASSWORD_CHANGE_ERROR_CODE,
  type PasswordChangeErrorCode,
} from "@/app/constants/access/PasswordChangeError.constants";
import type { PasswordChangeErrorCopy } from "../models/PasswordChangeErrorCopy.type";
import type { PasswordChangeFormCopy } from "../models/PasswordChangeFormCopy.interface";

export const OWN_PASSWORD_CHANGE_COPY: PasswordChangeFormCopy =
  {
    CONFIRM_PASSWORD_LABEL: "own confirm label",
    CURRENT_PASSWORD_LABEL: "own current label",
    NEW_PASSWORD_LABEL: "own new label",
    PASSWORD_PLACEHOLDER: "own placeholder",
    SUBMIT: "own submit",
    SUBMITTING: "own submitting",
  };

export const OWN_PASSWORD_CHANGE_ERROR_COPY =
  Object.fromEntries(
    Object.values(PASSWORD_CHANGE_ERROR_CODE).map(
      (code: PasswordChangeErrorCode) => [
        code,
        `own error ${code}`,
      ]
    )
  ) as PasswordChangeErrorCopy;

export const PLACEHOLDER_FIELD_COUNT = 3;
export const OWN_HEADING = "own heading";
