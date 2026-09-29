import type { SignInField } from "@/app/constants";
import type { SignInError } from "@/app/services/authentication/models/SignInError.interface";

export interface FieldErrorCase {
  error: SignInError;
  field: SignInField;
  label: string;
}
