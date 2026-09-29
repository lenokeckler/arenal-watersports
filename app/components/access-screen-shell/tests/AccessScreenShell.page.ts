import { screen } from "@testing-library/react";
import {
  ARIA_HIDDEN_SELECTOR,
  CHILD_TEXT,
  REGION_ROLE,
  TITLE_TEXT,
} from "./AccessScreenShell.constants";

export const createAccessScreenShellPage = () => {
  const getCard = () =>
    screen.getByRole(REGION_ROLE, { name: TITLE_TEXT });
  const getChild = () => screen.getByText(CHILD_TEXT);
  const getBackdrop = () =>
    document.querySelector(ARIA_HIDDEN_SELECTOR);

  return { getCard, getChild, getBackdrop };
};
