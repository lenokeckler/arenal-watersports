import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PASSWORD_RULES_COPY } from "@/app/components/password-rules-checklist/constants/PasswordRulesCopy.constants";
import { ARIA_ROLE, IMAGE_ALTS } from "@/app/constants";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { PROFILE_PASSWORD_FORM_COPY } from "../constants/ProfilePasswordFormCopy.constants";
import {
  ARROW_BACK_ICON_NAME,
  HEADING_LEVEL,
} from "./ProfilePasswordForm.constants";

export const createProfilePasswordFormPage = () => {
  const user = userEvent.setup();
  const getInput = (label: string) =>
    screen.getByLabelText(label);
  const getSubmit = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(PROFILE_PASSWORD_FORM_COPY.SUBMIT),
    });

  return {
    fill: async (input: PasswordChangeInput) => {
      await user.type(
        getInput(
          PROFILE_PASSWORD_FORM_COPY.CURRENT_PASSWORD_LABEL
        ),
        input.currentPassword
      );
      await user.type(
        getInput(
          PROFILE_PASSWORD_FORM_COPY.NEW_PASSWORD_LABEL
        ),
        input.newPassword
      );
      await user.type(
        getInput(
          PROFILE_PASSWORD_FORM_COPY.CONFIRM_PASSWORD_LABEL
        ),
        input.confirmPassword
      );
    },
    findAlert: () => screen.findByRole(ARIA_ROLE.ALERT),
    findText: (text: string) => screen.findByText(text),
    getArrowIcon: () =>
      screen.getByText(ARROW_BACK_ICON_NAME),
    getBackLink: () =>
      screen.getByRole(ARIA_ROLE.LINK, {
        name: PROFILE_PASSWORD_FORM_COPY.BACK,
      }),
    getConfirmInput: () =>
      getInput(
        PROFILE_PASSWORD_FORM_COPY.CONFIRM_PASSWORD_LABEL
      ),
    getCurrentInput: () =>
      getInput(
        PROFILE_PASSWORD_FORM_COPY.CURRENT_PASSWORD_LABEL
      ),
    getInstruction: () =>
      screen.getByText(
        PROFILE_PASSWORD_FORM_COPY.INSTRUCTION
      ),
    getLogo: () =>
      screen.getByAltText(IMAGE_ALTS.COMPANY_LOGO),
    getNewInput: () =>
      getInput(
        PROFILE_PASSWORD_FORM_COPY.NEW_PASSWORD_LABEL
      ),
    getRulesTitle: () =>
      screen.getByText(PASSWORD_RULES_COPY.TITLE),
    getSubmit,
    getUsernameInput: (username: string) =>
      screen.getByDisplayValue(username),
    getTitle: () =>
      screen.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL,
        name: PROFILE_PASSWORD_FORM_COPY.HEADING,
      }),
    submit: () => user.click(getSubmit()),
  };
};
