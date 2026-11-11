import type { PasswordRecoveryRequestInput } from "@/app/utils/password-recovery/models/PasswordRecoveryRequestInput.interface";

export interface NetworkPasswordRecoveryRequestInput extends PasswordRecoveryRequestInput {
  networkKey: string;
}
