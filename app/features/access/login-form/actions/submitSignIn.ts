"use server";

import { redirect } from "next/navigation";
import {
  PATHS,
  SERVER_OPERATION,
  SIGN_IN_ERROR_CODE,
} from "@/app/constants";
import {
  signInWithUsername,
  type SignInCredentials,
  type SignInError,
  type SignInResult,
} from "@/app/services/authentication";
import { reportServerError } from "@/app/services/observability";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";

const reportSignInFailure = (error: unknown): boolean => {
  try {
    reportServerError(SERVER_OPERATION.SIGN_IN, error);
    return true;
  } catch {
    return false;
  }
};

const runSignIn = async (
  credentials: SignInCredentials
): Promise<SignInResult> => {
  try {
    return await signInWithUsername(credentials);
  } catch (error) {
    reportSignInFailure(error);

    return {
      ok: false,
      error: createSignInError(SIGN_IN_ERROR_CODE.UNKNOWN),
    };
  }
};

export const submitSignIn = async (
  credentials: SignInCredentials
): Promise<SignInError> => {
  const result = await runSignIn(credentials);

  if (result.ok) {
    redirect(PATHS.HOME);
  }

  return result.error;
};
