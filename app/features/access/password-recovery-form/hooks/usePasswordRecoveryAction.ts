import { useActionState, useState } from "react";
import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import type { PasswordRecoveryAction } from "../models/PasswordRecoveryAction.interface";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";

export const usePasswordRecoveryAction = (
  serverAction: PasswordRecoveryServerAction
): PasswordRecoveryAction => {
  const [error, action, isPending] = useActionState(
    serverAction,
    null
  );
  const [dismissedError, setDismissedError] =
    useState<NullableRef<PasswordRecoveryError>>(null);

  return {
    action,
    dismiss: () => setDismissedError(error),
    error: error === dismissedError ? null : error,
    isPending,
  };
};
