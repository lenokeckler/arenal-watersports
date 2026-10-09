import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import {
  HEADER_LOGO_ALT,
  HEADER_TITLE,
  HEADING_LEVEL,
} from "./ScreenHeader.constants";

export const createScreenHeaderPage = () => ({
  getLogo: () => screen.getByAltText(HEADER_LOGO_ALT),
  getTitle: () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL,
      name: HEADER_TITLE,
    }),
});
