import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";

const getNavigationLink = (label: string) =>
  screen.getByRole(ARIA_ROLE.LINK, { name: label });

const queryNavigation = () =>
  screen.queryByRole(ARIA_ROLE.NAVIGATION, {
    name: SYSTEM_NAVIGATION_COPY.LABEL,
  });

const getPendingButton = (label: string) =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: SYSTEM_NAVIGATION_COPY.PENDING_LABEL(label),
  });

const queryPendingButton = (label: string) =>
  screen.queryByRole(ARIA_ROLE.BUTTON, {
    name: SYSTEM_NAVIGATION_COPY.PENDING_LABEL(label),
  });

const getMenuButton = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: SYSTEM_NAVIGATION_COPY.MENU,
  });

const getMenuRegion = () =>
  screen.getByRole(ARIA_ROLE.REGION, { hidden: true });

const getMenuLink = (label: string) =>
  screen.getByRole(ARIA_ROLE.LINK, { name: label });

const queryMenuLink = (label: string) =>
  screen.queryByRole(ARIA_ROLE.LINK, { name: label });

export const createSystemNavigationPage = () => {
  const user = userEvent.setup();

  return {
    getNavigationLink,
    queryNavigation,
    getPendingButton,
    queryPendingButton,
    getMenuButton,
    getMenuRegion,
    getMenuLink,
    queryMenuLink,
    openMenu: () => user.click(getMenuButton()),
    followMenuLink: (label: string) =>
      user.click(getMenuLink(label)),
  };
};
