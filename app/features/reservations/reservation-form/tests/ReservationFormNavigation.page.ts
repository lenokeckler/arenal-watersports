import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

export const createReservationFormNavigationPage = (
  user: ReturnType<typeof userEvent.setup>
) => {
  const getBackButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: RESERVATION_FORM_VIEW_TEST.BACK_TO_CALENDAR,
    });

  return {
    getBackButton,
    clickBack: async (): Promise<void> => {
      await user.click(getBackButton());
    },
  };
};
