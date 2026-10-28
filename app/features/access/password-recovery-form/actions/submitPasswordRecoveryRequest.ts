"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import { buildPasswordRecoveryResetPath } from "../utils/buildPasswordRecoveryResetPath";
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
      redirect(
        buildPasswordRecoveryResetPath(input.username)
      );
    }

    return result.error;
  };
