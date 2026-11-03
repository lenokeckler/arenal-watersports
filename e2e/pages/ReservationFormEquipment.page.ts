import type { Page } from "@playwright/test";
import { createReservationFormCategoryPage } from "./ReservationFormCategory.page";
import { createReservationFormQuantityPage } from "./ReservationFormQuantity.page";
import { createReservationFormUnitPage } from "./ReservationFormUnit.page";

export const createReservationFormEquipmentPage = (
  page: Page
) => ({
  ...createReservationFormCategoryPage(page),
  ...createReservationFormQuantityPage(page),
  ...createReservationFormUnitPage(page),
});
