import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import type { PasswordChangeResult } from "@/app/services/authentication";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { runWithFallback } from "@/app/utils/server-action/runWithFallback";
import type { PasswordChangeOperation } from "../models/PasswordChangeOperation.type";

export const runPasswordChange = (
  change: PasswordChangeOperation,
  input: PasswordChangeInput
): Promise<PasswordChangeResult> =>
  runWithFallback(
    change,
    input,
    (): PasswordChangeResult => ({
      ok: false,
      error: createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.UNKNOWN
      ),
    })
  );
