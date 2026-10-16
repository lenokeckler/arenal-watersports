import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { FIELD_LABEL } from "./NewPasswordGroup.constants";

export const createNewPasswordGroupPage = () => ({
  getInput: () => screen.getByLabelText(FIELD_LABEL),
  getItems: () => screen.getAllByRole(ARIA_ROLE.LISTITEM),
  getList: () => screen.getByRole(ARIA_ROLE.LIST),
});
