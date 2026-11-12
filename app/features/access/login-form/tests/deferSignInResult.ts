import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import type { DeferredSignInResult } from "./DeferredSignInResult.interface";

export const deferSignInResult =
  (): DeferredSignInResult => {
    let resolveResult: DeferredSignInResult["resolve"] =
      () => undefined;
    const promise = new Promise<SignInError>((resolve) => {
      resolveResult = resolve;
    });

    return {
      promise,
      resolve: (error) => resolveResult(error),
    };
  };
