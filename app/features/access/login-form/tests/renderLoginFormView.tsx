import { render } from "@testing-library/react";
import LoginFormView from "../LoginFormView";
import type { LoginFormViewProps } from "../models/LoginFormViewProps.interface";
import { createLoginFormViewPage } from "./LoginFormView.page";

export const renderLoginFormView = ({
  notice = null,
  noticeMessage = null,
}: Partial<LoginFormViewProps> = {}) => {
  render(
    <LoginFormView
      notice={notice}
      noticeMessage={noticeMessage}
    />
  );
  return createLoginFormViewPage();
};
