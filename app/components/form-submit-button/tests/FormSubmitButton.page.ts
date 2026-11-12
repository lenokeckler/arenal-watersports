import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createFormSubmitButtonPage = () => ({
  getButton: (label: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(label),
    }),
  queryText: (text: string) => screen.queryByText(text),
});
