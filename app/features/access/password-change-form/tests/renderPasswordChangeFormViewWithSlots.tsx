import { render } from "@testing-library/react";
import PasswordChangeFormView from "../PasswordChangeFormView";
import { DEFAULT_PASSWORD_CHANGE_FORM_VIEW_PROPS } from "./PasswordChangeFormView.defaults.constants";
import { createPasswordChangeFormViewPage } from "./PasswordChangeFormView.page";
import {
  BEFORE_FIELDS_TEXT,
  FOOTER_TEXT,
  HEADING_TEXT,
} from "./PasswordChangeFormView.slots.constants";

export const renderPasswordChangeFormViewWithSlots = () => {
  render(
    <PasswordChangeFormView
      {...DEFAULT_PASSWORD_CHANGE_FORM_VIEW_PROPS}
      beforeFields={<span>{BEFORE_FIELDS_TEXT}</span>}
      footer={<span>{FOOTER_TEXT}</span>}
      heading={<h1>{HEADING_TEXT}</h1>}
    />
  );
  return createPasswordChangeFormViewPage();
};
