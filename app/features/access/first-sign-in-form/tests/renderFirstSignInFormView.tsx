import { render } from "@testing-library/react";
import FirstSignInFormView from "../FirstSignInFormView";
import { createFirstSignInFormViewPage } from "./FirstSignInFormView.page";

export const renderFirstSignInFormView = () => {
  render(<FirstSignInFormView />);
  return createFirstSignInFormViewPage();
};
