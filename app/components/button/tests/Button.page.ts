import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createButtonPage = () => {
  const getButton = () =>
    screen.queryByRole<HTMLButtonElement>(ARIA_ROLE.BUTTON);

  return {
    getButton,
  };
};
