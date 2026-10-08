import type { FirstSignInFocusTrigger } from "../models/FirstSignInFocusTrigger.interface";
import type { FirstSignInFormErrors } from "../models/FirstSignInFormErrors.type";

export interface FirstSignInFocusProps {
  errors: FirstSignInFormErrors;
  trigger: FirstSignInFocusTrigger;
}
