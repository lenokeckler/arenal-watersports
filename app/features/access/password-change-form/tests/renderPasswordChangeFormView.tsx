import { render } from "@testing-library/react";
import FirstSignInFormHeading from "../components/FirstSignInFormHeading";
import PasswordChangeFormView from "../PasswordChangeFormView";
import { DEFAULT_PASSWORD_CHANGE_FORM_VIEW_PROPS } from "./PasswordChangeFormView.defaults.constants";
import { createPasswordChangeFormViewPage } from "./PasswordChangeFormView.page";

export const renderPasswordChangeFormView = () => {
  render(
    <PasswordChangeFormView
      {...DEFAULT_PASSWORD_CHANGE_FORM_VIEW_PROPS}
      heading={<FirstSignInFormHeading />}
    />
  );
  return createPasswordChangeFormViewPage();
};
