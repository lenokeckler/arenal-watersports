import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { THEME_TOGGLE_ACCESSIBLE_COPY } from "../constants/ThemeToggleCopy.constants";
import type { ThemeToggleButtonProps } from "../models/ThemeToggleButtonProps.interface";

export const createThemeToggleButtonPage = () => {
  const user = userEvent.setup();

  const getThemeButton = (
    theme: ThemeToggleButtonProps["theme"]
  ) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: THEME_TOGGLE_ACCESSIBLE_COPY[theme],
    });

  const pressThemeButton = async (
    theme: ThemeToggleButtonProps["theme"]
  ) => {
    await user.click(getThemeButton(theme));
  };

  return { getThemeButton, pressThemeButton };
};
