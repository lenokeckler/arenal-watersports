import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, type Theme } from "@/app/constants";
import { THEME_TOGGLE_COPY } from "../constants/ThemeToggleCopy.constants";

export const createSessionBarViewPage = () => {
  const user = userEvent.setup();

  const getBanners = () =>
    screen.getAllByRole(ARIA_ROLE.BANNER);

  const getBanner = () =>
    screen.getByRole(ARIA_ROLE.BANNER);

  const getButtons = () =>
    within(getBanner()).getAllByRole(ARIA_ROLE.BUTTON);

  const getButton = (name: string) =>
    within(getBanner()).getByRole(ARIA_ROLE.BUTTON, {
      name,
    });

  const getThemeButton = (theme: Theme) =>
    within(getBanner()).getByRole(ARIA_ROLE.BUTTON, {
      name: THEME_TOGGLE_COPY[theme],
    });

  const getStatus = () =>
    within(getBanner()).getByRole(ARIA_ROLE.STATUS);

  const queryAlert = () =>
    within(getBanner()).queryByRole(ARIA_ROLE.ALERT);

  const queryAlertAnywhere = () =>
    screen.queryByRole(ARIA_ROLE.ALERT);

  const getLastRowItem = () =>
    getBanner().firstElementChild?.lastElementChild ?? null;

  const press = async (name: string) => {
    await user.click(getButton(name));
  };

  const pressThemeButton = async (theme: Theme) => {
    await user.click(getThemeButton(theme));
  };

  return {
    getBanners,
    getBanner,
    getButtons,
    getButton,
    getThemeButton,
    getStatus,
    queryAlert,
    queryAlertAnywhere,
    getLastRowItem,
    press,
    pressThemeButton,
  };
};
