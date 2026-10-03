import type {
  SIGN_IN_FIELD,
  SignInField,
} from "@/app/constants/access/SignInError.constants";

export type LoginFocusField = Exclude<
  SignInField,
  typeof SIGN_IN_FIELD.FORM
>;
