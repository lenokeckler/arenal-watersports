import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";

export const createLogoutButtonPage = () => {
  const user = userEvent.setup();

  const getButton = (name: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name });

  const getIcon = (name: string, iconName: string) =>
    within(getButton(name)).getByText(iconName);

  const press = async (name: string) => {
    await user.click(getButton(name));
  };

  return { getButton, getIcon, press };
};
