import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import type { SignedInWorker } from "./SignedInWorker.interface";

export type ReauthenticationResult =
  | { ok: true; worker: SignedInWorker }
  | { ok: false; error: PasswordChangeError };
