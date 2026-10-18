import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import { createLoginFormControlsPage } from "./LoginFormControls.page";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";

const createLoginFormViewQueries = () => ({
  ...createLoginFormControlsPage(),
  findBanner: () => screen.findByRole(ARIA_ROLE.ALERT),
  findText: (text: string) => screen.findByText(text),
  getForgotLink: () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: LOGIN_FORM_COPY.FORGOT_PASSWORD,
    }),
  getPasswordInput: () =>
    screen.getByLabelText(LOGIN_FORM_COPY.PASSWORD_LABEL),
  queryNotice: () => screen.queryByRole(ARIA_ROLE.STATUS),
  getToggle: (label: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name: label }),
  getUsernameInput: () =>
    screen.getByLabelText(LOGIN_FORM_COPY.USERNAME_LABEL),
});

export const createLoginFormViewPage = () => {
  const user = userEvent.setup();
  const queries = createLoginFormViewQueries();

  const fillCredentials = async ({
    password,
    username,
  }: SignInCredentials) => {
    await user.type(queries.getUsernameInput(), username);
    await user.type(queries.getPasswordInput(), password);
  };
  const typeUsername = async (text: string) => {
    await user.type(queries.getUsernameInput(), text);
  };
  const typeWithoutClicking = async (text: string) => {
    await user.keyboard(text);
  };
  const submit = async () => {
    await user.click(queries.getIdleSubmit());
  };
  const clickToggle = async (label: string) => {
    await user.click(queries.getToggle(label));
  };

  return {
    ...queries,
    clickToggle,
    fillCredentials,
    submit,
    typeUsername,
    typeWithoutClicking,
  };
};
