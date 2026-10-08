import { useActionState, useState } from "react";
import type { NullableRef } from "@/app/types";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import type { FirstSignInAction } from "../models/FirstSignInAction.interface";

export const useFirstSignInAction =
  (): FirstSignInAction => {
    const [error, action, isPending] = useActionState(
      submitFirstPasswordChange,
      null
    );
    const [dismissedError, setDismissedError] =
      useState<NullableRef<FirstSignInError>>(null);

    return {
      action,
      dismiss: () => setDismissedError(error),
      error: error === dismissedError ? null : error,
      isPending,
    };
  };
