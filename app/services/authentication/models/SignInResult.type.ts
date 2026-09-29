import type { SignInError } from "./SignInError.interface";

export type SignInResult =
  { ok: true } | { ok: false; error: SignInError };
