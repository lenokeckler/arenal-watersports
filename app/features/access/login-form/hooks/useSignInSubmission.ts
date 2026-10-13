import { useState, useTransition } from "react";
import { validateSignInCredentials } from "@/app/utils/sign-in/validateSignInCredentials";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { SignInSubmission } from "../models/SignInSubmission.interface";
import { requestSignIn } from "../utils/requestSignIn";
import { useLatestServerError } from "./useLatestServerError";

const nextAttempt = (attempt: number): number =>
  attempt + 1;

export const useSignInSubmission = (): SignInSubmission => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const [isPending, startTransition] = useTransition();
  const serverError = useLatestServerError();

  const submit = (credentials: SignInCredentials): void => {
    if (isPending) {
      return;
    }

    setHasSubmitted(true);
    setSubmitAttempt(nextAttempt);
    const submissionId = serverError.clear();

    if (validateSignInCredentials(credentials)) {
      return;
    }

    startTransition(async () => {
      const result = await requestSignIn(credentials);
      if (serverError.settle(submissionId, result)) {
        setSubmitAttempt(nextAttempt);
      }
    });
  };

  return {
    clearServerError: serverError.clear,
    hasSubmitted,
    isPending,
    serverError: serverError.error,
    submit,
    submitAttempt,
  };
};
