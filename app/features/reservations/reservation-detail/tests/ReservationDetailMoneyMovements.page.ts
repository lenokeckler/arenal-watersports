import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DETAIL_MOVEMENTS_COPY } from "../constants/ReservationDetailMovementsCopy.constants";
import type { ReservationDetailMoneyMovementsPage } from "./models/ReservationDetailMoneyMovementsPage.interface";

export const createReservationDetailMoneyMovementsPage =
  (): ReservationDetailMoneyMovementsPage => {
    const queryToggle = (): HTMLElement | null =>
      screen.queryByRole(ARIA_ROLE.BUTTON);

    return {
      clickToggle: (user: UserEvent): Promise<void> =>
        user.click(screen.getByRole(ARIA_ROLE.BUTTON)),
      getRows: (): HTMLElement[] =>
        screen.queryAllByRole(ARIA_ROLE.LISTITEM),
      queryEmpty: (): HTMLElement | null =>
        screen.queryByText(
          RESERVATION_DETAIL_MOVEMENTS_COPY.MOVEMENTS_EMPTY
        ),
      queryToggle,
    };
  };
