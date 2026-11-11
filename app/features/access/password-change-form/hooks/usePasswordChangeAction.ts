import { useActionState, useState } from "react";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import type { PasswordChangeAction } from "../models/PasswordChangeAction.interface";
import type { PasswordChangeServerAction } from "../models/PasswordChangeServerAction.type";

export const usePasswordChangeAction = (
  serverAction: PasswordChangeServerAction
): PasswordChangeAction => {
  const [error, action, isPending] = useActionState(
    serverAction,
    null
  );
  const [dismissedError, setDismissedError] =
    useState<NullableRef<PasswordChangeError>>(null);

  return {
    action,
    dismiss: () => setDismissedError(error),
    error: error === dismissedError ? null : error,
    isPending,
  };
};
