import type {
  SignInErrorCode,
  SignInField,
} from "@/app/constants";

export interface SignInError {
  code: SignInErrorCode;
  field: SignInField;
}
