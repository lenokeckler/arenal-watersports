import { render } from "@testing-library/react";
import PasswordChangeFormView from "../PasswordChangeFormView";
import { createPasswordChangeFormViewPage } from "./PasswordChangeFormView.page";

export const renderPasswordChangeFormView = () => {
  render(<PasswordChangeFormView />);
  return createPasswordChangeFormViewPage();
};
