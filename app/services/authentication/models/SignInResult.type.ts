import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";

export type SignInResult =
  { ok: true } | { ok: false; error: SignInError };
