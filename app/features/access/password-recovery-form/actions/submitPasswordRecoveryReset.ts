"use server";

import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { storePasswordRecoveryGrant } from "@/app/services/password-recovery";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import { readPasswordRecoveryResetInput } from "../utils/readPasswordRecoveryResetInput";
import { runPasswordRecoveryReset } from "../utils/runPasswordRecoveryReset";

export const submitPasswordRecoveryReset: PasswordRecoveryServerAction =
  async (_previousError, formData) => {
    const result = await runPasswordRecoveryReset(
      readPasswordRecoveryResetInput(formData)
    );

    if (result.ok) {
      await storePasswordRecoveryGrant(result.grant);
      redirect(PATHS.ACCESS.RECOVERY_PASSWORD);
    }

    return result.error;
  };
