import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS, STRING } from "@/app/constants";
import { RESERVATION_HISTORY_HREF } from "@/app/features/board/reservation-history/constants/ReservationHistoryHref.constants";
import { E2E_RESERVATION_HISTORY_COPY } from "../constants/E2eReservationHistory.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";
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

  return {
    getCategoryField: (): Locator =>
      getField(copy.EQUIPMENT_LABEL),
    getEmptyTitle: (): Locator =>
      getTitle(copy.EMPTY_TITLE),
    getFilteredEmptyTitle: (): Locator =>
      getTitle(copy.FILTERED_EMPTY_TITLE),
    getFromField: (): Locator =>
      getField(copy.FILTER_FROM_LABEL),
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
    getRecord: (customerName: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: customerName,
      }),
    getSubmit: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: copy.FILTER_SUBMIT,
      }),
    getToField: (): Locator =>
      getField(copy.FILTER_TO_LABEL),
    getTypeField: (): Locator =>
      getField(copy.FILTER_TYPE_LABEL),
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
