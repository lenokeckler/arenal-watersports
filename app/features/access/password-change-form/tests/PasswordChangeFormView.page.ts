import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { ENTER_KEY } from "./PasswordChangeFormView.constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";

const getInput = (label: string) =>
  screen.getByLabelText(label);

const getSubmit = (label: string) =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: new RegExp(label),
  });

export const createPasswordChangeFormViewPage = () => {
  const user = userEvent.setup();
  const getCurrentInput = () =>
    getInput(
      FIRST_SIGN_IN_FORM_COPY.CURRENT_PASSWORD_LABEL
    );
  const getNewInput = () =>
    getInput(FIRST_SIGN_IN_FORM_COPY.NEW_PASSWORD_LABEL);
  const getConfirmInput = () =>
    getInput(
      FIRST_SIGN_IN_FORM_COPY.CONFIRM_PASSWORD_LABEL
    );

  const fill = async (input: PasswordChangeInput) => {
    await user.type(
      getCurrentInput(),
      input.currentPassword
    );
    await user.type(getNewInput(), input.newPassword);
    await user.type(
      getConfirmInput(),
      input.confirmPassword
    );
  };
  const submit = async () => {
    await user.click(
      getSubmit(FIRST_SIGN_IN_FORM_COPY.SUBMIT)
    );
  };

  const pressEnterInConfirm = async () => {
    await user.type(getConfirmInput(), ENTER_KEY);
  };

  const submitWhilePending = async () => {
    await user.click(
      getSubmit(FIRST_SIGN_IN_FORM_COPY.SUBMITTING)
    );
  };

  return {
    fill,
    findBanner: () => screen.findByRole(ARIA_ROLE.ALERT),
    findText: (text: string) => screen.findByText(text),
    getConfirmInput,
    getCurrentInput,
    getItems: () => screen.getAllByRole(ARIA_ROLE.LISTITEM),
    getList: () => screen.getByRole(ARIA_ROLE.LIST),
    getNewInput,
    pressEnterInConfirm,
    queryPendingSubmit: () =>
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: new RegExp(
          FIRST_SIGN_IN_FORM_COPY.SUBMITTING
        ),
      }),
    getPendingSubmit: () =>
      getSubmit(FIRST_SIGN_IN_FORM_COPY.SUBMITTING),
    submit,
    submitWhilePending,
  };
};
