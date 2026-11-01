import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { E2E_RESERVATION_DETAIL_COPY } from "../constants/E2eReservationDetail.constants";
import { getMainRegion } from "../support/mainRegion";

const getSection = (
  main: Locator,
  sectionName: string
): Locator =>
  main.getByRole(ARIA_ROLE.REGION, {
    exact: true,
    name: sectionName,
  });

const getDispatchGroup = (
  main: Locator,
  categoryName: string
): Locator =>
  getSection(main, E2E_RESERVATION_DETAIL_COPY.DISPATCHES)
    .getByText(categoryName, { exact: true })
    .locator("xpath=ancestor::li");

const hasHorizontalOverflow = async (
  page: Page
): Promise<boolean> =>
  await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      window.innerWidth
  );

const getReservationHeading = (
  main: Locator,
  customerName: string
): Locator =>
  main.getByRole(ARIA_ROLE.HEADING, {
    name: customerName,
  });

const goToReservationDetail = async (
  page: Page,
  reservationId: string
): Promise<void> => {
  await page.goto(PATHS.RESERVATIONS.DETAIL(reservationId));
};

export const createReservationDetailPage = (page: Page) => {
  const main = getMainRegion(page);
  return {
    getAuditSection: (): Locator =>
      getSection(main, E2E_RESERVATION_DETAIL_COPY.AUDIT),
    getChargeSection: (): Locator =>
      getSection(
        main,
        E2E_RESERVATION_DETAIL_COPY.CHARGE_STATUS
      ),
    getChargeAmountRow: (label: string): Locator =>
      getSection(
        main,
        E2E_RESERVATION_DETAIL_COPY.CHARGE_STATUS
      )
        .getByText(label, { exact: true })
        .locator("xpath=.."),
    getRefundSection: (): Locator =>
      getSection(
        main,
        E2E_RESERVATION_DETAIL_COPY.CHARGE_STATUS
      )
        .getByText(E2E_RESERVATION_DETAIL_COPY.REFUNDS, {
          exact: true,
        })
        .locator("xpath=.."),
    getDispatchGroup: (categoryName: string): Locator =>
      getDispatchGroup(main, categoryName),
    getDispatchSection: (): Locator =>
      getSection(
        main,
        E2E_RESERVATION_DETAIL_COPY.DISPATCHES
      ),
    getEquipmentSection: (): Locator =>
      getSection(
        main,
        E2E_RESERVATION_DETAIL_COPY.EQUIPMENT
      ),
    getExtrasSection: (): Locator =>
      getSection(main, E2E_RESERVATION_DETAIL_COPY.EXTRAS),
    getGuideSection: (): Locator =>
      getSection(main, E2E_RESERVATION_DETAIL_COPY.GUIDES),
    getOverview: (): Locator =>
      getSection(
        main,
        E2E_RESERVATION_DETAIL_COPY.RESERVATION
      ),
    getReservationContent: (): Locator => main,
    getReservationHeading: (
      customerName: string
    ): Locator => getReservationHeading(main, customerName),
    hasHorizontalOverflow: (): Promise<boolean> =>
      hasHorizontalOverflow(page),
    goTo: (reservationId: string): Promise<void> =>
      goToReservationDetail(page, reservationId),
  };
};
