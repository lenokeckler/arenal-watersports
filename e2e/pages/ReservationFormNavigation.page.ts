import type { Page } from "@playwright/test";
import { createReservationFormActionPage } from "./ReservationFormAction.page";
import { createReservationFormHeaderPage } from "./ReservationFormHeader.page";

export const createReservationFormNavigationPage = (
  page: Page
) => ({
  ...createReservationFormActionPage(page),
  ...createReservationFormHeaderPage(page),
});
