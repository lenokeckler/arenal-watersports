import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import { isPasswordRecoveryResetInputField } from "./isPasswordRecoveryResetInputField";
import { keepPasswordRecoveryPinDigits } from "./keepPasswordRecoveryPinDigits";

export const changePasswordRecoveryResetValue = (
  values: PasswordRecoveryPinInput,
  name: string,
  value: string
): PasswordRecoveryPinInput =>
  isPasswordRecoveryResetInputField(name)
    ? {
        ...values,
        [name]:
          name === PASSWORD_RECOVERY_FIELD.PIN
            ? keepPasswordRecoveryPinDigits(value)
            : value,
      }
    : values;
