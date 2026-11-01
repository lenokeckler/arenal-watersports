import type {
  PasswordRecoveryErrorCode,
  PasswordRecoveryField,
} from "@/app/constants";

export interface PasswordRecoveryError {
  code: PasswordRecoveryErrorCode;
  field: PasswordRecoveryField;
}
