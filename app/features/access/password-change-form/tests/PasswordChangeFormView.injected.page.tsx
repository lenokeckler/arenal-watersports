import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import type { PasswordChangeServerAction } from "../models/PasswordChangeServerAction.type";
import PasswordChangeFormView from "../PasswordChangeFormView";
import { DEFAULT_PASSWORD_CHANGE_FORM_VIEW_PROPS } from "./PasswordChangeFormView.defaults.constants";
import {
  OWN_HEADING,
  OWN_PASSWORD_CHANGE_COPY as copy,
  OWN_PASSWORD_CHANGE_ERROR_COPY,
} from "./PasswordChangeFormView.injected.constants";

const getButton = (label: string) =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: new RegExp(label),
  });

export const renderInjectedPasswordChangeFormView = (
  action: PasswordChangeServerAction
) => {
  render(
    <PasswordChangeFormView
      {...DEFAULT_PASSWORD_CHANGE_FORM_VIEW_PROPS}
      action={action}
      copy={copy}
      errorCopy={OWN_PASSWORD_CHANGE_ERROR_COPY}
      heading={<h1>{OWN_HEADING}</h1>}
    />
  );
  const user = userEvent.setup();

  const fill = async (
    input: PasswordChangeInput = DEFAULT_PASSWORD_CHANGE_INPUT
  ) => {
    await user.type(
      screen.getByLabelText(copy.CURRENT_PASSWORD_LABEL),
      input.currentPassword
    );
    await user.type(
      screen.getByLabelText(copy.NEW_PASSWORD_LABEL),
      input.newPassword
    );
    await user.type(
      screen.getByLabelText(copy.CONFIRM_PASSWORD_LABEL),
      input.confirmPassword
    );
  };

  return {
    fill,
    findBanner: () => screen.findByRole(ARIA_ROLE.ALERT),
    findText: (text: string) => screen.findByText(text),
    getInputs: () =>
      screen.getAllByPlaceholderText(
        copy.PASSWORD_PLACEHOLDER
      ),
    getSubmit: getButton,
    submit: () => user.click(getButton(copy.SUBMIT)),
    submitWhilePending: () =>
      user.click(getButton(copy.SUBMITTING)),
  };
};
