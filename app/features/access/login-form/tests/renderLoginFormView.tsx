import { render } from "@testing-library/react";
import type { NullableRef } from "@/app/types";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import LoginFormView from "../LoginFormView";
import { createLoginFormViewPage } from "./LoginFormView.page";

export const renderLoginFormView = (
  notice: NullableRef<SignInError> = null
) => {
  render(<LoginFormView notice={notice} />);
  return createLoginFormViewPage();
};
