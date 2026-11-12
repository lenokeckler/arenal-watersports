"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import { PATHS } from "@/app/constants";
import { storePasswordRecoveryUsername } from "@/app/services/password-recovery";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import { readPasswordRecoveryRequestInput } from "../utils/readPasswordRecoveryRequestInput";
import { runPasswordRecoveryRequest } from "../utils/runPasswordRecoveryRequest";

export const submitPasswordRecoveryRequest: PasswordRecoveryServerAction =
  async (_previousError, formData) => {
    const input =
      readPasswordRecoveryRequestInput(formData);
    const result = await runPasswordRecoveryRequest(
      input,
      (task) => after(task)
    );

    if (result.ok) {
      await storePasswordRecoveryUsername(input.username);
      redirect(PATHS.ACCESS.RECOVERY_RESET);
    }

    return result.error;
  };
