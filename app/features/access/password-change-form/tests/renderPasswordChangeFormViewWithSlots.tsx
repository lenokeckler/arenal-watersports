import { render } from "@testing-library/react";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import PasswordChangeFormView from "../PasswordChangeFormView";
import { createPasswordChangeFormViewPage } from "./PasswordChangeFormView.page";
import {
  BEFORE_FIELDS_TEXT,
  FOOTER_TEXT,
  HEADING_TEXT,
} from "./PasswordChangeFormView.slots.constants";

export const renderPasswordChangeFormViewWithSlots = () => {
  render(
    <PasswordChangeFormView
      action={submitFirstPasswordChange}
      beforeFields={<span>{BEFORE_FIELDS_TEXT}</span>}
      copy={FIRST_SIGN_IN_FORM_COPY}
      errorCopy={FIRST_SIGN_IN_ERROR_COPY}
      footer={<span>{FOOTER_TEXT}</span>}
      heading={<h1>{HEADING_TEXT}</h1>}
    />
  );
  return createPasswordChangeFormViewPage();
};
