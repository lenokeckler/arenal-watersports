import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import type { PasswordChangeResult } from "@/app/services/authentication";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { runWithUnknownFallback } from "@/app/utils/server-action/runWithUnknownFallback";
import type { PasswordChangeOperation } from "../models/PasswordChangeOperation.type";

export const runPasswordChange = (
  change: PasswordChangeOperation,
  input: PasswordChangeInput
): Promise<PasswordChangeResult> =>
  runWithUnknownFallback(change, input, {
    ok: false,
    error: createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.UNKNOWN
    ),
  });
