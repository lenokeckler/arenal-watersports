import { render } from "@testing-library/react";
import type { NullableRef } from "@/app/types";
import LoginFormView from "../LoginFormView";
import { createLoginFormViewPage } from "./LoginFormView.page";

export const renderLoginFormView = (
  noticeMessage: NullableRef<string> = null
) => {
  render(<LoginFormView noticeMessage={noticeMessage} />);
  return createLoginFormViewPage();
};
