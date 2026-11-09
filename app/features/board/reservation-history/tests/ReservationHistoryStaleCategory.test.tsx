import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ReservationHistoryInner from "../components/ReservationHistoryInner";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import {
  HISTORY_UNFILTERED_QUERY,
  buildPage,
} from "./ReservationHistory.constants";
import {
  FILTER_CATEGORY_OPTIONS,
  FILTER_UNLISTED_CATEGORY_ID,
} from "./ReservationHistoryFiltersForm.constants";
import { createReservationHistoryFiltersPage } from "./ReservationHistoryFilters.page";

describe("ReservationHistoryFilters with a category missing from the options", () => {
  it("does not present the applied category filter as the all option", () => {
    const query = {
      ...HISTORY_UNFILTERED_QUERY,
      filters: {
        ...HISTORY_UNFILTERED_QUERY.filters,
        categoryId: FILTER_UNLISTED_CATEGORY_ID,
      },
    };
    render(
      <ReservationHistoryInner
        page={buildPage([])}
        query={query}
        categoryOptions={FILTER_CATEGORY_OPTIONS}
        hasInvertedDateRange={false}
      />
    );
    const page = createReservationHistoryFiltersPage();

    expect(
      page.getField(
        RESERVATION_HISTORY_COPY.EQUIPMENT_LABEL
      )
    ).toHaveValue(FILTER_UNLISTED_CATEGORY_ID);
  });
});
