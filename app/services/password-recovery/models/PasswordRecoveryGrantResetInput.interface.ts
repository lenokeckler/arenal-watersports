import type { PasswordRecoveryNewPasswordInput } from "@/app/utils/password-recovery/models/PasswordRecoveryNewPasswordInput.interface";

export interface PasswordRecoveryGrantResetInput extends PasswordRecoveryNewPasswordInput {
  grant: string;
}
