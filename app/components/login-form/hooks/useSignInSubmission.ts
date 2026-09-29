import { useState, useTransition } from "react";
import { validateSignInCredentials } from "@/app/services/authentication/validateSignInCredentials";
import type { SignInCredentials } from "@/app/services/authentication/models/SignInCredentials.interface";
import type { SignInError } from "@/app/services/authentication/models/SignInError.interface";
import type { NullableRef } from "@/app/types";
import { submitSignIn } from "../actions/submitSignIn";
import type { SignInSubmission } from "../models/SignInSubmission.interface";

export const useSignInSubmission = (): SignInSubmission => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [serverError, setServerError] =
    useState<NullableRef<SignInError>>(null);
  const [isPending, startTransition] = useTransition();

  const clearServerError = (): void => setServerError(null);

  const submit = (credentials: SignInCredentials): void => {
    if (isPending) {
      return;
    }

    setHasSubmitted(true);
    setServerError(null);

    if (validateSignInCredentials(credentials)) {
      return;
    }

    startTransition(async () => {
      setServerError(await submitSignIn(credentials));
    });
  };

  return {
    clearServerError,
    hasSubmitted,
    isPending,
    serverError,
    submit,
  };
};
