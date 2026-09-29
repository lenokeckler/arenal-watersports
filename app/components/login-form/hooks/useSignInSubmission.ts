import { unstable_rethrow } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { SIGN_IN_ERROR_CODE } from "@/app/constants/access/SignInError.constants";
import { createSignInError } from "@/app/services/authentication/createSignInError";
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
    clearServerError();
    const submissionId = latestSubmissionId.current;

    if (validateSignInCredentials(credentials)) {
      return;
    }

    startTransition(async () => {
      const result = await requestSignIn(credentials);
      if (submissionId === latestSubmissionId.current) {
        setServerError(result);
      }
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
