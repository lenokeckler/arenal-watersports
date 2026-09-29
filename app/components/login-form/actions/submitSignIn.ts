"use server";

import { redirect } from "next/navigation";
import { PATHS, SIGN_IN_ERROR_CODE } from "@/app/constants";
import {
  signInWithUsername,
  type SignInCredentials,
  type SignInError,
  type SignInResult,
} from "@/app/services/authentication";
import { createSignInError } from "@/app/services/authentication/createSignInError";

const runSignIn = async (
  credentials: SignInCredentials
): Promise<SignInResult> => {
  try {
    return await signInWithUsername(credentials);
  } catch {
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
