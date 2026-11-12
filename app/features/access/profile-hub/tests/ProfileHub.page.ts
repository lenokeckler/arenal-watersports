import { screen } from "@testing-library/react";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_ROLE, IMAGE_ALTS } from "@/app/constants";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import { HEADING_LEVEL } from "./ProfileHub.constants";

export const createProfileHubPage = () => ({
  getChevrons: () =>
    screen.getAllByText(MATERIAL_ICON_NAME.CHEVRON_RIGHT),
  getEntryLink: () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: new RegExp(PROFILE_COPY.PASSWORD_ENTRY),
    }),
  getEmailEntryLink: (name: string) =>
    screen.getByRole(ARIA_ROLE.LINK, { name }),
  getEntryList: () => screen.getByRole(ARIA_ROLE.LIST),
  getEntryListItems: () =>
    screen.getAllByRole(ARIA_ROLE.LISTITEM),
  getMailIcon: () =>
    screen.getByText(MATERIAL_ICON_NAME.MAIL),
  queryText: (text: string) => screen.queryByText(text),
  getLeadingIcon: () =>
    screen.getByText(MATERIAL_ICON_NAME.LOCK_RESET),
  getLogo: () =>
    screen.getByAltText(IMAGE_ALTS.COMPANY_LOGO),
  getTitle: () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL,
      name: PROFILE_COPY.TITLE,
    }),
  queryNotice: () => screen.queryByRole(ARIA_ROLE.STATUS),
});
