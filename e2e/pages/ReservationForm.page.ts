import type { Page } from "@playwright/test";
import { createReservationFormEquipmentPage } from "./ReservationFormEquipment.page";
import { createReservationFormNavigationPage } from "./ReservationFormNavigation.page";
import { createReservationFormSchedulePage } from "./ReservationFormSchedule.page";
import { createReservationFormSubmissionPage } from "./ReservationFormSubmission.page";

export const createReservationFormPage = (page: Page) => ({
  ...createReservationFormEquipmentPage(page),
  ...createReservationFormNavigationPage(page),
  ...createReservationFormSchedulePage(page),
  ...createReservationFormSubmissionPage(page),
});
