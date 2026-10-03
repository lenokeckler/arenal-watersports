import type { SignInField } from "@/app/constants";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";

export interface FieldErrorCase {
  error: SignInError;
  field: SignInField;
  label: string;
}
