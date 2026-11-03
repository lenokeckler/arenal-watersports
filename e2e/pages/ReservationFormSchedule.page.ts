import type { Page } from "@playwright/test";
import { createReservationFormCustomerPage } from "./ReservationFormCustomer.page";
import { createReservationFormDurationPage } from "./ReservationFormDuration.page";
import { createReservationFormScheduleFieldsPage } from "./ReservationFormScheduleFields.page";

export const createReservationFormSchedulePage = (
  page: Page
) => ({
  ...createReservationFormCustomerPage(page),
  ...createReservationFormDurationPage(page),
  ...createReservationFormScheduleFieldsPage(page),
});
