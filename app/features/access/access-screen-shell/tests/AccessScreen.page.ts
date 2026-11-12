import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { ACCESS_SCREEN_COPY } from "../constants/AccessScreenCopy.constants";
import {
  CHILD_TEXT,
  REGION_ROLE,
} from "./AccessScreenShell.constants";

export const createAccessScreenPage = () => {
  const getMain = () => screen.getByRole(ARIA_ROLE.MAIN);
  const getCard = () =>
    screen.getByRole(REGION_ROLE, {
      name: ACCESS_SCREEN_COPY.TITLE,
    });
  const getChild = () => screen.getByText(CHILD_TEXT);

  return { getCard, getChild, getMain };
};
