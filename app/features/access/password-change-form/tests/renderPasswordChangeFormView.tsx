import { render } from "@testing-library/react";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import FirstSignInFormHeading from "../components/FirstSignInFormHeading";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import PasswordChangeFormView from "../PasswordChangeFormView";
import { createPasswordChangeFormViewPage } from "./PasswordChangeFormView.page";

export const renderPasswordChangeFormView = () => {
  render(
    <PasswordChangeFormView
      action={submitFirstPasswordChange}
      copy={FIRST_SIGN_IN_FORM_COPY}
      errorCopy={FIRST_SIGN_IN_ERROR_COPY}
      heading={<FirstSignInFormHeading />}
    />
  );
  return createPasswordChangeFormViewPage();
};
