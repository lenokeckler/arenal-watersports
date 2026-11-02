import type { NullableRef } from "@/app/types";

export interface ReservationCalendarDayPage {
  getCustomer: () => HTMLElement;
  getReservationBlock: () => HTMLElement;
  getMessage: (message: string) => NullableRef<HTMLElement>;
}
