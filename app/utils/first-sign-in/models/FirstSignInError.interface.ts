import type {
  FirstSignInErrorCode,
  FirstSignInField,
} from "@/app/constants";

export interface FirstSignInError {
  code: FirstSignInErrorCode;
  field: FirstSignInField;
}
