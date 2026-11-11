"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import {
  forgetPasswordRecoveryGrant,
  readPasswordRecoveryGrant,
} from "@/app/services/password-recovery";
import { createPasswordRecoveryError } from "@/app/utils/password-recovery/createPasswordRecoveryError";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import { buildLoginRecoveredPath } from "../utils/buildLoginRecoveredPath";
import { readPasswordRecoveryNewPasswordInput } from "../utils/readPasswordRecoveryNewPasswordInput";
import { runPasswordRecoveryNewPassword } from "../utils/runPasswordRecoveryNewPassword";
import { signOutBrowserLocally } from "../utils/signOutBrowserLocally";

export const submitPasswordRecoveryNewPassword: PasswordRecoveryServerAction =
  async (_previousError, formData) => {
    const grant = await readPasswordRecoveryGrant();

    if (grant === null) {
      return createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.RESET_EXPIRED
      );
    }

    const result = await runPasswordRecoveryNewPassword(
      {
        ...readPasswordRecoveryNewPasswordInput(formData),
        grant,
      },
      (task) => after(task)
    );

    if (result.ok) {
      await forgetPasswordRecoveryGrant();
      await signOutBrowserLocally();
      redirect(buildLoginRecoveredPath());
    }

    if (
      result.error.code ===
      PASSWORD_RECOVERY_ERROR_CODE.RESET_EXPIRED
    ) {
      await forgetPasswordRecoveryGrant();
    }

    return result.error;
  };
