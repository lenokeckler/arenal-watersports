import { useActionState, useState } from "react";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import type { FirstSignInAction } from "../models/FirstSignInAction.interface";

export const useFirstSignInAction =
  (): FirstSignInAction => {
    const [error, action, isPending] = useActionState(
      submitFirstPasswordChange,
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
