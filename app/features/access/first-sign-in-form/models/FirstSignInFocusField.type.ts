import type {
  FIRST_SIGN_IN_FIELD,
  FirstSignInField,
} from "@/app/constants/access/FirstSignInError.constants";

export type FirstSignInFocusField = Exclude<
  FirstSignInField,
  typeof FIRST_SIGN_IN_FIELD.FORM
>;
