import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";

export const DEFAULT_PASSWORD_CHANGE_FORM_VIEW_PROPS = {
  action: submitFirstPasswordChange,
  copy: FIRST_SIGN_IN_FORM_COPY,
  errorCopy: FIRST_SIGN_IN_ERROR_COPY,
};
