import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";

export type FirstPasswordChangeResult =
  { ok: true } | { ok: false; error: FirstSignInError };
