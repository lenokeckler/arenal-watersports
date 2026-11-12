import type { PasswordChangeResult } from "@/app/services/authentication";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";

export type PasswordChangeOperation = (
  input: PasswordChangeInput
) => Promise<PasswordChangeResult>;
