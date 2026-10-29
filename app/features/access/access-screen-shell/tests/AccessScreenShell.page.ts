import { screen } from "@testing-library/react";
import { ACCESS_SHELL_BACKDROP_TEST_ID } from "../constants/AccessScreenShell.constants";
import {
  CHILD_TEXT,
  REGION_ROLE,
  TITLE_TEXT,
} from "./AccessScreenShell.constants";

export const createAccessScreenShellPage = () => {
  const getCard = () =>
    screen.getByRole(REGION_ROLE, { name: TITLE_TEXT });
  const getChild = () => screen.getByText(CHILD_TEXT);
  const getBackdrop = () =>
    screen.getByTestId(ACCESS_SHELL_BACKDROP_TEST_ID);

  return { getCard, getChild, getBackdrop };
};
