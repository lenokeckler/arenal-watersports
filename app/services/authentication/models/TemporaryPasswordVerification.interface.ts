import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";

export interface TemporaryPasswordVerification {
  error: NullableRef<PasswordChangeError>;
  passwordAlreadyUpdated: boolean;
}
