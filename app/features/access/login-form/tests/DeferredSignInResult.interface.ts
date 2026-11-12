import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";

export interface DeferredSignInResult {
  promise: Promise<SignInError>;
  resolve: (error: SignInError) => void;
}
