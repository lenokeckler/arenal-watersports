import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import type { FirstSignInChangeHandler } from "./FirstSignInChangeHandler.type";

export interface FirstSignInFormValues {
  onChange: FirstSignInChangeHandler;
  values: FirstPasswordChangeInput;
}
