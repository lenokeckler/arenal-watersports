import { unstable_rethrow } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { SIGN_IN_ERROR_CODE } from "@/app/constants/access/SignInError.constants";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";
import { validateSignInCredentials } from "@/app/utils/sign-in/validateSignInCredentials";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import type { NullableRef } from "@/app/types";
import { submitSignIn } from "../actions/submitSignIn";
import type { SignInSubmission } from "../models/SignInSubmission.interface";

export const useSignInSubmission = (): SignInSubmission => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const [serverError, setServerError] =
    useState<NullableRef<SignInError>>(null);
  const [isPending, startTransition] = useTransition();

  const latestSubmissionId = useRef(0);

  const clearServerError = (): void => {
    latestSubmissionId.current += 1;
    setServerError(null);
  };

  const requestSignIn = async (
    credentials: SignInCredentials
  ): Promise<SignInError> => {
    try {
      return await submitSignIn(credentials);
    } catch (error) {
      unstable_rethrow(error);
      return createSignInError(SIGN_IN_ERROR_CODE.NETWORK);
    }
  };

  const submit = (credentials: SignInCredentials): void => {
    if (isPending) {
      return;
    }

    setHasSubmitted(true);
    setSubmitAttempt((attempt) => attempt + 1);
    clearServerError();
    const submissionId = latestSubmissionId.current;

    if (validateSignInCredentials(credentials)) {
      return;
    }

    startTransition(async () => {
      const result = await requestSignIn(credentials);
      if (submissionId === latestSubmissionId.current) {
        setServerError(result);
        setSubmitAttempt((attempt) => attempt + 1);
      }
    });
  };

  return {
    clearServerError,
    hasSubmitted,
    isPending,
    serverError,
    submit,
    submitAttempt,
  };
};
