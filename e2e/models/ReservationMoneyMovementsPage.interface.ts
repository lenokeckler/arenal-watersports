import type { Locator } from "@playwright/test";
import type { createReservationDetailPage } from "../pages/ReservationDetail.page";

export interface ReservationMoneyMovementsPage {
  detailPage: ReturnType<
    typeof createReservationDetailPage
  >;
  getEmpty: () => Locator;
  getPanel: () => Locator;
  getRows: () => Locator;
  getToggle: (name: string) => Locator;
}
