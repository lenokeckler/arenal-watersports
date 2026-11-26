import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DETAIL_MOVEMENTS_TOGGLE_TEST } from "./ReservationDetailMoneyMovementsToggleTest.constants";
import type { ReservationDetailMoneyMovementsTogglePage } from "./models/ReservationDetailMoneyMovementsTogglePage.interface";

export const createReservationDetailMoneyMovementsTogglePage =
  (): ReservationDetailMoneyMovementsTogglePage => {
    const getToggle = (): HTMLElement =>
      screen.getByRole(ARIA_ROLE.BUTTON);

    return {
      clickToggle: (user: UserEvent): Promise<void> =>
        user.click(getToggle()),
      getPanel: (): HTMLElement | null =>
        document.getElementById(
          RESERVATION_DETAIL_MOVEMENTS_TOGGLE_TEST.PANEL_ID
        ),
      getToggle,
      queryChild: (): HTMLElement | null =>
        screen.queryByText(
          RESERVATION_DETAIL_MOVEMENTS_TOGGLE_TEST.CHILD_TEXT
        ),
    };
  };
