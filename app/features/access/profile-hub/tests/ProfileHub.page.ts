import { screen } from "@testing-library/react";
import {
  ARIA_ROLE,
  PROFILE_SCREEN_LOGO_ALT,
} from "@/app/constants";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import {
  CHEVRON_RIGHT_ICON_NAME,
  HEADING_LEVEL,
  LOCK_RESET_ICON_NAME,
} from "./ProfileHub.constants";

export const createProfileHubPage = () => ({
  getChevron: () =>
    screen.getByText(CHEVRON_RIGHT_ICON_NAME),
  getEntryLink: () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: new RegExp(PROFILE_COPY.PASSWORD_ENTRY),
    }),
  getLeadingIcon: () =>
    screen.getByText(LOCK_RESET_ICON_NAME),
  getLogo: () =>
    screen.getByAltText(PROFILE_SCREEN_LOGO_ALT),
  getTitle: () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL,
      name: PROFILE_COPY.TITLE,
    }),
  queryNotice: () => screen.queryByRole(ARIA_ROLE.STATUS),
});
