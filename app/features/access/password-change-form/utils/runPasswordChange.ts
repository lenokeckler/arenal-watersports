import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import type { PasswordChangeResult } from "@/app/services/authentication";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import type { PasswordChangeOperation } from "../models/PasswordChangeOperation.type";

export const runPasswordChange = async (
  change: PasswordChangeOperation,
  input: PasswordChangeInput
): Promise<PasswordChangeResult> => {
  try {
    return await change(input);
  } catch {
    return {
      ok: false,
      error: createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.UNKNOWN
      ),
    };
  }
};
