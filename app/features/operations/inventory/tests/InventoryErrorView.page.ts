import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, KEYBOARD } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";

export const createInventoryErrorViewPage = () => {
  const user = userEvent.setup();
  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: INVENTORY_COPY.LOAD_ERROR_TITLE,
    });
  const getDescription = () =>
    screen.getByRole(ARIA_ROLE.ALERT);
  const getRetryButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: INVENTORY_COPY.RETRY,
    });
  const retry = async (): Promise<void> => {
    await user.click(getRetryButton());
  };
  const retryWithKeyboard = async (): Promise<void> => {
    await user.tab();
    await user.keyboard(`{${KEYBOARD.ENTER}}`);
  };
  return {
    getDescription,
    getHeading,
    getRetryButton,
    retry,
    retryWithKeyboard,
  };
};
