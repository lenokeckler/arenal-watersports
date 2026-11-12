import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { SESSION_IDLE_WARNING_COPY } from "../constants/SessionIdleWarningCopy.constants";

export const createSessionIdleWarningPage = () => {
  const user = userEvent.setup();

  const getDialog = () =>
    screen.getByRole(ARIA_ROLE.ALERT_DIALOG);

  const queryDialog = () =>
    screen.queryByRole(ARIA_ROLE.ALERT_DIALOG);

  const getKeepWorking = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: SESSION_IDLE_WARNING_COPY.KEEP_WORKING,
    });

  const getSignOut = (name: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name });

  const queryError = () =>
    screen.queryByRole(ARIA_ROLE.ALERT);

  const press = async (button: HTMLElement) => {
    await user.click(button);
  };

  return {
    getDialog,
    getKeepWorking,
    getSignOut,
    press,
    queryDialog,
    queryError,
  };
};
