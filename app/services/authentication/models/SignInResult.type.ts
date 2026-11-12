import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";

export type SignInResult =
  | { ok: true; mustChangePassword: boolean }
  | { ok: false; error: SignInError };
