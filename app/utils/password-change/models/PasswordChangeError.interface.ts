import type {
  PasswordChangeErrorCode,
  PasswordChangeField,
} from "@/app/constants";

export interface PasswordChangeError {
  code: PasswordChangeErrorCode;
  field: PasswordChangeField;
}
