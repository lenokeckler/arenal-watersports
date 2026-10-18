import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";

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

  return {
    getBanners,
    getBanner,
    getButtons,
    getButton,
    getStatus,
    queryAlert,
    queryAlertAnywhere,
    getLastRowItem,
    press,
  };
};
