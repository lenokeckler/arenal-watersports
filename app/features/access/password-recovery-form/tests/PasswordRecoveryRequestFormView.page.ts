import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import {
  FORM_SELECTOR,
  LABEL_SEPARATOR,
} from "./passwordRecoveryView.constants";

export const createPasswordRecoveryRequestFormViewPage =
  () => {
    const user = userEvent.setup();
    const getUsernameInput = () =>
      screen.getByLabelText<HTMLInputElement>(
        PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_LABEL
      );
    const getSubmit = () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: new RegExp(
          [
            PASSWORD_RECOVERY_REQUEST_COPY.SUBMIT,
            PASSWORD_RECOVERY_REQUEST_COPY.SUBMITTING,
          ].join(LABEL_SEPARATOR)
        ),
      });

    return {
      clickSubmit: () => user.click(getSubmit()),
      getBackLink: () =>
        screen.getByRole(ARIA_ROLE.LINK, {
          name: PASSWORD_RECOVERY_REQUEST_COPY.BACK,
        }),
      getForm: () =>
        document.querySelector(
          FORM_SELECTOR
        ) as HTMLElement,
      getHeading: () =>
        screen.getByRole(ARIA_ROLE.HEADING, {
          name: PASSWORD_RECOVERY_REQUEST_COPY.HEADING,
        }),
      getNote: () =>
        screen.getByText(
          PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE
        ),
      getSubmit,
      getUsernameInput,
      queryAlerts: () =>
        screen.queryAllByRole(ARIA_ROLE.ALERT),
      typeUsername: (username: string) =>
        user.type(getUsernameInput(), username),
    };
  };
