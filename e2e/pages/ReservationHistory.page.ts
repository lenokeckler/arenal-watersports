import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  PATHS,
  RESERVATION_HISTORY_FILTER_PARAM,
  STRING,
} from "@/app/constants";
import { RESERVATION_HISTORY_HREF } from "@/app/features/board/reservation-history/constants/ReservationHistoryHref.constants";
import {
  E2E_RESERVATION_HISTORY_CATALOGUE,
  E2E_RESERVATION_HISTORY_COPY,
  E2E_RESERVATION_HISTORY_LOOKUP,
} from "../constants/E2eReservationHistory.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import { getMainRegion } from "../support/mainRegion";
import type { E2eReservationHistoryDetailField } from "../support/models/E2eReservationHistoryDetailField.interface";
import type { E2eReservationHistoryFilters } from "../support/models/E2eReservationHistoryFilters.interface";
import type { E2eReservationHistoryQuery } from "../support/models/E2eReservationHistoryQuery.type";

export const createReservationHistoryPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const copy = E2E_RESERVATION_HISTORY_COPY;
  const getField = (label: string): Locator =>
    main.getByLabel(label, { exact: true });
  const getTitle = (title: string): Locator =>
    main.getByText(title, { exact: true });

  const getRecord = (customerName: string): Locator =>
    main.getByRole(ARIA_ROLE.LINK, { name: customerName });
  const getFromField = (): Locator =>
    getField(copy.FILTER_FROM_LABEL);
  const getTypeField = (): Locator =>
    getField(copy.FILTER_TYPE_LABEL);
  const getCategoryField = (): Locator =>
    getField(copy.EQUIPMENT_LABEL);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: copy.FILTER_SUBMIT,
    });

  return {
    applyFilters: async ({
      category,
      from,
      type,
    }: E2eReservationHistoryFilters): Promise<void> => {
      await getFromField().fill(from);
      await getTypeField().selectOption({ label: type });
      await getCategoryField().selectOption({
        label: category,
      });
      await getSubmit().click();
      await page.waitForURL(
        (url) =>
          url.searchParams.get(
            RESERVATION_HISTORY_FILTER_PARAM.FROM
          ) === from &&
          Boolean(
            url.searchParams.get(
              RESERVATION_HISTORY_FILTER_PARAM.TYPE
            )
          ) ===
            (type !== copy.FILTER_ALL) &&
          Boolean(
            url.searchParams.get(
              RESERVATION_HISTORY_FILTER_PARAM.CATEGORY
            )
          ) ===
            (category !== copy.FILTER_ALL)
      );
    },
    getExpectedLines:
      (): readonly E2eReservationHistoryDetailField[] => [
        {
          label: copy.EQUIPMENT_LABEL,
          present:
            E2E_RESERVATION_HISTORY_LOOKUP.DEFAULT_CATEGORY_NAME,
        },
        {
          label: copy.EQUIPMENT_LABEL,
          present:
            E2E_RESERVATION_HISTORY_CATALOGUE.QUANTITY_CATEGORY_NAME,
        },
        {
          absent: E2E_WORKER.FULL_NAME,
          label: copy.GUIDE_LABEL,
          present:
            E2E_RESERVATION_HISTORY_LOOKUP.SEEDED_ADMIN_NAME,
        },
        {
          absent:
            E2E_RESERVATION_HISTORY_LOOKUP.SEEDED_ADMIN_NAME,
          label: copy.ATTENDED_BY_LABEL,
          present: E2E_WORKER.FULL_NAME,
        },
      ],
    getRecordLine: (
      customerName: string,
      label: string
    ): Locator =>
      getRecord(customerName)
        .getByText(label)
        .locator(".."),
    getCategoryField,
    getEmptyTitle: (): Locator =>
      getTitle(copy.EMPTY_TITLE),
    getFilteredEmptyTitle: (): Locator =>
      getTitle(copy.FILTERED_EMPTY_TITLE),
    getFromField,
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getInvertedRangeError: (): Locator =>
      main
        .getByRole(ARIA_ROLE.ALERT)
        .filter({ hasText: copy.FILTER_DATE_RANGE_ERROR })
        .first(),
    getNextPage: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: copy.PAGINATION_NEXT,
      }),
    getPageIndicator: (
      pageNumber: number,
      pageCount: number
    ): Locator =>
      getTitle(
        [
          copy.PAGINATION_PAGE,
          pageNumber,
          copy.PAGINATION_OF,
          pageCount,
        ].join(STRING.SPACE)
      ),
    getPreviousPage: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: copy.PAGINATION_PREVIOUS,
      }),
    getRecord,
    getSubmit,
    getToField: (): Locator =>
      getField(copy.FILTER_TO_LABEL),
    getTypeField,
    goTo: async (
      query: E2eReservationHistoryQuery = {}
    ): Promise<void> => {
      const queryString = new URLSearchParams(
        query
      ).toString();

      await page.goto(
        queryString === STRING.Empty
          ? PATHS.HISTORY.ROOT
          : `${PATHS.HISTORY.ROOT}${RESERVATION_HISTORY_HREF.QUERY_PREFIX}${queryString}`
      );
    },
  };
};
