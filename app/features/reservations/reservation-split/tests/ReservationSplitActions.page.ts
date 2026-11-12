import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";

export const createReservationSplitActionsPage = () => {
  const user = userEvent.setup();

  const getAddButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: RESERVATION_SPLIT_UI_COPY.ADD_DEPARTURE,
    });

  const getSubmitButton = (name: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name });

  const queryBlockedNote = () =>
    screen.queryByText(
      RESERVATION_SPLIT_UI_COPY.ADD_DEPARTURE_BLOCKED
    );

  const queryAlert = () =>
    screen.queryByRole(ARIA_ROLE.ALERT);

  const getSuccessStatus = () =>
    screen.getByRole(ARIA_ROLE.STATUS);

  const getCalendarLink = () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: RESERVATION_SPLIT_UI_COPY.BACK_TO_CALENDAR,
    });

  const clickAdd = () => user.click(getAddButton());

  return {
    clickAdd,
    getAddButton,
    getCalendarLink,
    getSubmitButton,
    getSuccessStatus,
    queryAlert,
    queryBlockedNote,
  };
};
