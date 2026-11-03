import { screen } from "@testing-library/react";
import {
  ARIA_ROLE,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CALENDAR_DAY_ENTRY } from "./ReservationCalendarDay.constants";
import type { ReservationCalendarDayPage } from "./models/ReservationCalendarDayPage.interface";

export const createReservationCalendarDayPage =
  (): ReservationCalendarDayPage => {
    const getMessage = (
      message: string
    ): NullableRef<HTMLElement> =>
      screen.queryByText(message);
    const getCustomer = (): HTMLElement =>
      screen.getByText(CALENDAR_DAY_ENTRY.customerName);
    const getReservationBlock = (): HTMLElement =>
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: new RegExp(
          RESERVATIONS_CALENDAR_COPY.RESERVATION_NAME
        ),
      });

    return { getCustomer, getMessage, getReservationBlock };
  };
