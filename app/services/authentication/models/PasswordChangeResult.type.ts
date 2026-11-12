import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";

export type PasswordChangeResult =
  { ok: true } | { ok: false; error: PasswordChangeError };
