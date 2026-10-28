"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import { buildLoginRecoveredPath } from "../utils/buildLoginRecoveredPath";
import { readPasswordRecoveryResetInput } from "../utils/readPasswordRecoveryResetInput";
import { runPasswordRecoveryReset } from "../utils/runPasswordRecoveryReset";
import { signOutBrowserLocally } from "../utils/signOutBrowserLocally";

export const submitPasswordRecoveryReset: PasswordRecoveryServerAction =
  async (_previousError, formData) => {
    const result = await runPasswordRecoveryReset(
      readPasswordRecoveryResetInput(formData),
      (task) => after(task)
    );

    if (result.ok) {
      await signOutBrowserLocally();
      redirect(buildLoginRecoveredPath());
    }

    return result.error;
  };
