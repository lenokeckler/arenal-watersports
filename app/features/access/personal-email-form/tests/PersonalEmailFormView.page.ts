import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import { LABEL_SEPARATOR } from "./personalEmailFormView.constants";
import type { PersonalEmailFieldValues } from "../models/PersonalEmailFieldValues.type";

const buttonNamed = (...labels: string[]) =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: new RegExp(labels.join(LABEL_SEPARATOR)),
  });

export const createPersonalEmailFormViewPage = () => {
  const user = userEvent.setup();
  const getEmailInput = () =>
    screen.getByLabelText<HTMLInputElement>(
      PERSONAL_EMAIL_FORM_COPY.EMAIL_LABEL
    );
  const getPasswordInput = () =>
    screen.getByLabelText<HTMLInputElement>(
      PERSONAL_EMAIL_FORM_COPY.CURRENT_PASSWORD_LABEL
    );
  const getSave = () =>
    buttonNamed(
      PERSONAL_EMAIL_FORM_COPY.SUBMIT,
      PERSONAL_EMAIL_FORM_COPY.SUBMITTING
    );
  const getRemove = () =>
    buttonNamed(
      PERSONAL_EMAIL_FORM_COPY.REMOVE,
      PERSONAL_EMAIL_FORM_COPY.REMOVING
    );

  return {
    clickRemove: () => user.click(getRemove()),
    clickSave: () => user.click(getSave()),
    fill: async ({
      currentPassword,
      email,
    }: PersonalEmailFieldValues) => {
      await user.clear(getEmailInput());
      await user.type(getEmailInput(), email);
      await user.type(getPasswordInput(), currentPassword);
    },
    findText: (text: string) => screen.findByText(text),
    getBackLink: () =>
      screen.getByRole(ARIA_ROLE.LINK, {
        name: PERSONAL_EMAIL_FORM_COPY.BACK,
      }),
    getEmailInput,
    getPasswordInput,
    getRemove,
    getSave,
    queryRemove: () =>
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: new RegExp(PERSONAL_EMAIL_FORM_COPY.REMOVE),
      }),
    queryText: (text: string) => screen.queryByText(text),
  };
};
