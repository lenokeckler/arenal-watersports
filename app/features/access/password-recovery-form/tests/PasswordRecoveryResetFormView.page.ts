import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import {
  FORM_SELECTOR,
  LABEL_SEPARATOR,
  VALID_NEW_PASSWORD,
} from "./passwordRecoveryView.constants";
import { TYPED_PIN } from "./passwordRecoveryScreen.constants";

export const createPasswordRecoveryResetFormViewPage =
  () => {
    const user = userEvent.setup();
    const inputLabelled = (label: string) =>
      screen.getByLabelText<HTMLInputElement>(label);
    const getPinInput = () =>
      inputLabelled(PASSWORD_RECOVERY_RESET_COPY.PIN_LABEL);
    const getNewPasswordInput = () =>
      inputLabelled(
        PASSWORD_RECOVERY_RESET_COPY.NEW_PASSWORD_LABEL
      );
    const getConfirmInput = () =>
      inputLabelled(
        PASSWORD_RECOVERY_RESET_COPY.CONFIRM_PASSWORD_LABEL
      );
    const getSubmit = () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: new RegExp(
          [
            PASSWORD_RECOVERY_RESET_COPY.SUBMIT,
            PASSWORD_RECOVERY_RESET_COPY.SUBMITTING,
          ].join(LABEL_SEPARATOR)
        ),
      });

    return {
      clickSubmit: () => user.click(getSubmit()),
      fillValid: async () => {
        await user.type(getPinInput(), TYPED_PIN);
        await user.type(
          getNewPasswordInput(),
          VALID_NEW_PASSWORD
        );
        await user.type(
          getConfirmInput(),
          VALID_NEW_PASSWORD
        );
      },
      getAnotherPinLink: () =>
        screen.getByRole(ARIA_ROLE.LINK, {
          name: PASSWORD_RECOVERY_RESET_COPY.REQUEST_ANOTHER_PIN,
        }),
      getBackLink: () =>
        screen.getByRole(ARIA_ROLE.LINK, {
          name: PASSWORD_RECOVERY_REQUEST_COPY.BACK,
        }),
      getConfirmInput,
      getForm: () =>
        document.querySelector(
          FORM_SELECTOR
        ) as HTMLElement,
      getHeading: () =>
        screen.getByRole(ARIA_ROLE.HEADING, {
          name: PASSWORD_RECOVERY_RESET_COPY.HEADING,
        }),
      getNewPasswordInput,
      getNoEmailNote: () =>
        screen.getByText(
          PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE
        ),
      getNotice: () =>
        screen.getByText(
          PASSWORD_RECOVERY_RESET_COPY.CONFIRMATION
        ),
      getPinInput,
      getRuleItems: () =>
        screen.getAllByRole(ARIA_ROLE.LISTITEM),
      getSubmit,
      getUsernameInput: () =>
        inputLabelled(
          PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_LABEL
        ),
      queryAlerts: () =>
        screen.queryAllByRole(ARIA_ROLE.ALERT),
    };
  };
