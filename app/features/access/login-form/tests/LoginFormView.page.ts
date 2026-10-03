import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import { createLoginFormControlsPage } from "./LoginFormControls.page";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";

export const createLoginFormViewPage = () => {
  const user = userEvent.setup();
  const { getIdleSubmit, getPendingSubmit } =
    createLoginFormControlsPage();

  const getUsernameInput = () =>
    screen.getByLabelText(LOGIN_FORM_COPY.USERNAME_LABEL);
  const getPasswordInput = () =>
    screen.getByLabelText(LOGIN_FORM_COPY.PASSWORD_LABEL);
  const getToggle = (label: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name: label });
  const findText = (text: string) =>
    screen.findByText(text);
  const findBanner = () =>
    screen.findByRole(ARIA_ROLE.ALERT);

  const fillCredentials = async ({
    password,
    username,
  }: SignInCredentials) => {
    await user.type(getUsernameInput(), username);
    await user.type(getPasswordInput(), password);
  };
  const typeUsername = async (text: string) => {
    await user.type(getUsernameInput(), text);
  };
  const submit = async () => {
    await user.click(getIdleSubmit());
  };
  const clickToggle = async (label: string) => {
    await user.click(getToggle(label));
  };

  return {
    clickToggle,
    fillCredentials,
    findBanner,
    findText,
    getIdleSubmit,
    getPasswordInput,
    getPendingSubmit,
    getToggle,
    getUsernameInput,
    submit,
    typeUsername,
  };
};
