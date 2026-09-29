import { screen } from "@testing-library/react";
import { ACCESS_SCREEN_COPY } from "../constants/AccessScreen.constants";
import { IMAGE_ALTS } from "@/app/components/image/constants";
import { HEADING_ROLE } from "./AccessScreenHeader.constants";

export const createAccessScreenHeaderPage = () => {
  const getLogo = () =>
    screen.getByAltText(IMAGE_ALTS.ARENAL_LOGO);
  const getTitle = () =>
    screen.getByRole(HEADING_ROLE, {
      level: 1,
      name: ACCESS_SCREEN_COPY.TITLE,
    });

  return { getLogo, getTitle };
};
