import { screen } from "@testing-library/react";
import { ACCESS_SCREEN_COPY } from "../constants/AccessScreenCopy.constants";
import { REGION_ROLE } from "./AccessScreenShell.constants";

export const createAccessScreenCompositionPage = () => {
  const getCard = () =>
    screen.getByRole(REGION_ROLE, {
      name: ACCESS_SCREEN_COPY.TITLE,
    });

  return { getCard };
};
