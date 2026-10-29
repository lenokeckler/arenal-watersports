import { screen } from "@testing-library/react";
import { ACCESS_SCREEN_COPY } from "../constants/AccessScreenCopy.constants";
import { HEADING_ROLE } from "./AccessScreenHeader.constants";

export const createAccessScreenHeaderPage = () => {
  const getLogo = () =>
    screen.getByAltText(ACCESS_SCREEN_COPY.LOGO_ALT);
  const getTitle = () =>
    screen.getByRole(HEADING_ROLE, {
      level: 1,
      name: ACCESS_SCREEN_COPY.TITLE,
    });

  return { getLogo, getTitle };
};
