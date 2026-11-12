import { screen } from "@testing-library/react";
import { FIELD_LABEL } from "./PasswordField.constants";

export const createPasswordFieldPage = () => ({
  getInput: () => screen.getByLabelText(FIELD_LABEL),
  queryText: (text: string) => screen.queryByText(text),
});
