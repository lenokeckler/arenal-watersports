import { render } from "@testing-library/react";
import LoginFormView from "../LoginFormView";
import { createLoginFormViewPage } from "./LoginFormView.page";

export const renderLoginFormView = () => {
  render(<LoginFormView />);
  return createLoginFormViewPage();
};
