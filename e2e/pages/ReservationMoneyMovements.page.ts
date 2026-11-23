import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_RESERVATION_MONEY_MOVEMENTS_COPY as copy } from "../constants/E2eReservationMoneyMovements.constants";
import type { ReservationMoneyMovementsPage } from "../models/ReservationMoneyMovementsPage.interface";
import { createReservationDetailPage } from "./ReservationDetail.page";

export const createReservationMoneyMovementsPage = (
  page: Page
): ReservationMoneyMovementsPage => {
  const detailPage = createReservationDetailPage(page);
  const section = detailPage.getChargeSection();
  const panel = section.locator(`#${copy.PANEL_ID}`);
  return {
    detailPage,
    getEmpty: (): Locator =>
      section.getByText(copy.MOVEMENTS_EMPTY, {
        exact: true,
      }),
    getPanel: (): Locator => panel,
    getRows: (): Locator =>
      panel.getByRole(ARIA_ROLE.LISTITEM),
    getToggle: (name: string): Locator =>
      section.getByRole(ARIA_ROLE.BUTTON, {
        exact: true,
        name,
      }),
  };
};
