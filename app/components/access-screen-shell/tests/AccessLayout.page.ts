import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CHILD_TEXT } from "./AccessScreenShell.constants";

export const createAccessLayoutPage = () => {
  const getMain = () => screen.getByRole(ARIA_ROLE.MAIN);
  const getChild = () => screen.getByText(CHILD_TEXT);

  return { getChild, getMain };
};
