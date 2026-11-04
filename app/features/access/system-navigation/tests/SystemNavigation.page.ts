import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import SystemNavigationItemView from "../components/SystemNavigationItemView";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import type { SystemNavigationItemViewProps } from "../models/SystemNavigationItemViewProps.interface";

const getNavigationLink = (label: string) =>
  screen.getByRole(ARIA_ROLE.LINK, { name: label });

const getLastNavigationLink = (label: string) =>
  screen
    .getAllByRole(ARIA_ROLE.LINK, { name: label })
    .at(-1);

const queryNavigationLink = (label: string) =>
  screen.queryByRole(ARIA_ROLE.LINK, { name: label });

const queryNavigation = () =>
  screen.queryByRole(ARIA_ROLE.NAVIGATION, {
    name: SYSTEM_NAVIGATION_COPY.LABEL,
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

  const renderItem = (
    props: SystemNavigationItemViewProps
  ): void => {
    render(SystemNavigationItemView(props));
  };

  return {
    getNavigationLink,
    getLastNavigationLink,
    queryNavigationLink,
    queryNavigation,
    renderItem,
    getMenuButton,
    getMenuRegion,
    getMenuLink,
    queryMenuLink,
    openMenu: () => user.click(getMenuButton()),
    followMenuLink: (label: string) =>
      user.click(getMenuLink(label)),
  };
};
