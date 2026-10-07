import { useActionState, useState } from "react";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import type { NullableRef } from "@/app/types";
import { submitSignInForm } from "../actions/submitSignInForm";
import type { SignInFallback } from "../models/SignInFallback.interface";

export const useSignInFallback = (): SignInFallback => {
  const [error, action] = useActionState(
    submitSignInForm,
    null
  );
  const [dismissedError, setDismissedError] =
    useState<NullableRef<SignInError>>(null);

  return {
    action,
    dismiss: () => setDismissedError(error),
    error: error === dismissedError ? null : error,
  };
};
