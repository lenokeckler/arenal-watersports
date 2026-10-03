import { screen } from "@testing-library/react";
import { TEXTBOX_ROLE } from "./FormField.constants";

export const createFormFieldPage = (
  errorMessage: string
) => {
  const getInput = () => screen.getByRole(TEXTBOX_ROLE);
  const getError = () => screen.getByText(errorMessage);
  const queryError = () => screen.queryByText(errorMessage);

  return { getInput, getError, queryError };
};
