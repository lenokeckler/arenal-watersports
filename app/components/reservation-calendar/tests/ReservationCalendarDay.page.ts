import { screen } from "@testing-library/react";
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

    return { getCustomer, getMessage };
  };
