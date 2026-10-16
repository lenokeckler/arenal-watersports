import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { isPasswordRecoveryResetInputField } from "./isPasswordRecoveryResetInputField";
import { keepPasswordRecoveryPinDigits } from "./keepPasswordRecoveryPinDigits";

export const changePasswordRecoveryResetValue = (
  values: PasswordRecoveryResetInput,
  name: string,
  value: string
): PasswordRecoveryResetInput =>
  isPasswordRecoveryResetInputField(name)
    ? {
        ...values,
        [name]:
          name === PASSWORD_RECOVERY_FIELD.PIN
            ? keepPasswordRecoveryPinDigits(value)
            : value,
      }
    : values;
