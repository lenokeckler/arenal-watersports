import { render } from "@testing-library/react";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import PasswordChangeFormView from "../PasswordChangeFormView";
import { createPasswordChangeFormViewPage } from "./PasswordChangeFormView.page";

export const renderPasswordChangeFormView = () => {
  render(
    <PasswordChangeFormView
      action={submitFirstPasswordChange}
    />
  );
  return createPasswordChangeFormViewPage();
};
