import { screen } from "@testing-library/react";
import { IMAGE_ALTS } from "@/app/constants";
import { ACCESS_SCREEN_COPY } from "../constants/AccessScreenCopy.constants";
import { HEADING_ROLE } from "./AccessScreenHeader.constants";

export const createAccessScreenHeaderPage = () => {
  const getLogo = () =>
    screen.getByAltText(IMAGE_ALTS.COMPANY_LOGO);
  const getTitle = () =>
    screen.getByRole(HEADING_ROLE, {
      level: 1,
      name: ACCESS_SCREEN_COPY.TITLE,
    });

  return { getLogo, getTitle };
};
