import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_HISTORY_HREF } from "@/app/features/board/reservation-history/constants/ReservationHistoryHref.constants";
import {
  E2E_RESERVATION_HISTORY_COPY,
  E2E_RESERVATION_HISTORY_LOOKUP,
} from "../constants/E2eReservationHistory.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import { getMainRegion } from "../support/mainRegion";
import type { E2eReservationHistoryDetailField } from "../support/models/E2eReservationHistoryDetailField.interface";
import type { E2eReservationHistoryDetailValues } from "../support/models/E2eReservationHistoryDetailValues.interface";

export const createReservationHistoryDetailPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const copy = E2E_RESERVATION_HISTORY_COPY;

  return {
    getBackLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: copy.BACK_TO_HISTORY,
      }),
    getCancellationBlock: (): Locator =>
      main
        .getByRole(ARIA_ROLE.HEADING, {
          name: copy.CANCELLATION_REASON_TITLE,
        })
        .locator(".."),
    getExpectedFields: ({
      customerName,
      date,
    }: E2eReservationHistoryDetailValues): readonly E2eReservationHistoryDetailField[] => {
      const admin = E2E_RESERVATION_HISTORY_LOOKUP;
      const attendant = E2E_WORKER.FULL_NAME;

      return [
        {
          label: copy.CUSTOMER_LABEL,
          present: customerName,
        },
        { label: copy.DATE_LABEL, present: date },
        {
          label: copy.EQUIPMENT_LABEL,
          present: admin.DEFAULT_CATEGORY_NAME,
        },
        {
          absent: attendant,
          label: copy.GUIDE_LABEL,
          present: admin.SEEDED_ADMIN_NAME,
        },
        {
          absent: admin.SEEDED_ADMIN_NAME,
          label: copy.ATTENDED_BY_LABEL,
          present: attendant,
        },
        {
          absent: admin.SEEDED_ADMIN_NAME,
          label: copy.CREATED_BY_LABEL,
          present: attendant,
        },
        {
          absent: attendant,
          label: copy.UPDATED_BY_LABEL,
          present: admin.SEEDED_ADMIN_NAME,
        },
      ];
    },
    getField: (label: string): Locator =>
      main.getByText(label, { exact: true }).locator(".."),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getNotFoundTitle: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: copy.NOT_FOUND_TITLE,
      }),
    getSignatureCard: (): Locator =>
      main
        .getByRole(ARIA_ROLE.HEADING, {
          name: copy.SIGNATURE_TITLE,
        })
        .locator(".."),
    goToRecord: async (id: string): Promise<void> => {
      await page.goto(
        `${PATHS.HISTORY.ROOT}${RESERVATION_HISTORY_HREF.PATH_SEPARATOR}${id}`
      );
    },
  };
};
