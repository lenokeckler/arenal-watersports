import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";

const getNavigationLink = (label: string) =>
  screen.getByRole(ARIA_ROLE.LINK, { name: label });

const getLastNavigationLink = (label: string) =>
  screen
    .getAllByRole(ARIA_ROLE.LINK, { name: label })
    .at(-1);

const queryNavigationLink = (label: string) =>
  screen.queryByRole(ARIA_ROLE.LINK, { name: label });

const getNavigationLinks = () =>
  within(
    screen.getByRole(ARIA_ROLE.NAVIGATION, {
      name: SYSTEM_NAVIGATION_COPY.LABEL,
    })
  ).getAllByRole(ARIA_ROLE.LINK);

const queryNavigation = () =>
  screen.queryByRole(ARIA_ROLE.NAVIGATION, {
    name: SYSTEM_NAVIGATION_COPY.LABEL,
  });

const getMenuButton = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: SYSTEM_NAVIGATION_COPY.MENU,
  });

const queryMenuButton = () =>
  within(
    screen.getByRole(ARIA_ROLE.NAVIGATION, {
      name: SYSTEM_NAVIGATION_COPY.LABEL,
    })
  ).queryByRole(ARIA_ROLE.BUTTON, {
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
    getLastNavigationLink,
    queryNavigationLink,
    getNavigationLinks,
    queryNavigation,
    getMenuButton,
    queryMenuButton,
    getMenuRegion,
    getMenuLink,
    queryMenuLink,
    openMenu: () => user.click(getMenuButton()),
    pressEscape: () => user.keyboard("{Escape}"),
    clickOutsideNavigation: () => user.click(document.body),
    followMenuLink: (label: string) =>
      user.click(getMenuLink(label)),
  };
};
