import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";

export interface PasswordChangeFocusTrigger {
  invalidSubmitCount: number;
  serverError: NullableRef<PasswordChangeError>;
}
