import { unstable_rethrow } from "next/navigation";
import { SIGN_IN_ERROR_CODE } from "@/app/constants/access/SignInError.constants";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import { submitSignIn } from "../actions/submitSignIn";

export const requestSignIn = async (
  credentials: SignInCredentials
): Promise<SignInError> => {
  try {
    return await submitSignIn(credentials);
  } catch (error) {
    unstable_rethrow(error);
    return createSignInError(SIGN_IN_ERROR_CODE.NETWORK);
  }
};
