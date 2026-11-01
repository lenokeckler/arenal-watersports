import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PATHS, STRING } from "@/app/constants";
import { HISTORY_FULL_FILTERS } from "@/app/services/board/reservation-history/tests/ReservationHistory.constants";
import ReservationHistoryInner from "../components/ReservationHistoryInner";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_TYPE_LABEL } from "../constants/ReservationHistoryTypeOptions.constants";
import {
  HISTORY_QUERY,
  HISTORY_UNFILTERED_QUERY,
  buildPage,
} from "./ReservationHistory.constants";
import {
  ACTION_ATTRIBUTE,
  DESCRIBED_BY_ATTRIBUTE,
  FILTER_ACTIVE_CATEGORY,
  FILTER_CATEGORY_OPTIONS,
  FILTER_INACTIVE_CATEGORY,
  FORM_METHOD_GET,
  INVALID_ATTRIBUTE,
  INVALID_TRUE_VALUE,
  METHOD_ATTRIBUTE,
} from "./ReservationHistoryFiltersForm.constants";
import { createReservationHistoryFiltersPage } from "./ReservationHistoryFilters.page";

const renderScreen = (
  query:
    typeof HISTORY_QUERY | typeof HISTORY_UNFILTERED_QUERY,
  hasInvertedDateRange = false
) => {
  render(
    <ReservationHistoryInner
      page={buildPage([])}
      query={query}
      categoryOptions={FILTER_CATEGORY_OPTIONS}
      hasInvertedDateRange={hasInvertedDateRange}
    />
  );
  return createReservationHistoryFiltersPage();
};

describe("ReservationHistoryFilters", () => {
  it("fills the fields with the applied filters", () => {
    const page = renderScreen(HISTORY_QUERY);

    expect(
      page.getField(
        RESERVATION_HISTORY_COPY.FILTER_FROM_LABEL
      )
    ).toHaveValue(HISTORY_FULL_FILTERS.from);
    expect(
      page.getField(
        RESERVATION_HISTORY_COPY.FILTER_TO_LABEL
      )
    ).toHaveValue(HISTORY_FULL_FILTERS.to);
    expect(
      page.getField(
        RESERVATION_HISTORY_COPY.FILTER_TYPE_LABEL
      )
    ).toHaveValue(HISTORY_FULL_FILTERS.type);
    expect(
      page.getField(
        RESERVATION_HISTORY_COPY.EQUIPMENT_LABEL
      )
    ).toHaveValue(FILTER_ACTIVE_CATEGORY.id);
  });

  it("leaves every field blank without filters", () => {
    const page = renderScreen(HISTORY_UNFILTERED_QUERY);

    expect(
      page.getField(
        RESERVATION_HISTORY_COPY.FILTER_FROM_LABEL
      )
    ).toHaveValue(STRING.Empty);
    expect(
      page.getField(
        RESERVATION_HISTORY_COPY.FILTER_TYPE_LABEL
      )
    ).toHaveValue(STRING.Empty);
    expect(
      page.getField(
        RESERVATION_HISTORY_COPY.EQUIPMENT_LABEL
      )
    ).toHaveValue(STRING.Empty);
  });

  it("offers the three reservation types after the all option", () => {
    const page = renderScreen(HISTORY_UNFILTERED_QUERY);

    expect(
      page.getOptionLabels(
        RESERVATION_HISTORY_COPY.FILTER_TYPE_LABEL
      )
    ).toEqual([
      RESERVATION_HISTORY_COPY.FILTER_ALL,
      RESERVATION_HISTORY_TYPE_LABEL.rental,
      RESERVATION_HISTORY_TYPE_LABEL.tour,
      RESERVATION_HISTORY_TYPE_LABEL.combo,
    ]);
  });

  it("offers every category from props, inactive ones included", () => {
    const page = renderScreen(HISTORY_UNFILTERED_QUERY);

    expect(
      page.getOptionLabels(
        RESERVATION_HISTORY_COPY.EQUIPMENT_LABEL
      )
    ).toEqual([
      RESERVATION_HISTORY_COPY.FILTER_ALL,
      FILTER_ACTIVE_CATEGORY.name,
      FILTER_INACTIVE_CATEGORY.name,
    ]);
  });

  it("submits a plain GET to the history path", () => {
    const page = renderScreen(HISTORY_UNFILTERED_QUERY);
    const form = page.getForm();

    expect(form).toHaveAttribute(
      METHOD_ATTRIBUTE,
      FORM_METHOD_GET
    );
    expect(form).toHaveAttribute(
      ACTION_ATTRIBUTE,
      PATHS.HISTORY.ROOT
    );
    expect(page.getSubmitButton()).toBeInTheDocument();
  });

  it("shows no error on Hasta for a valid range", () => {
    const page = renderScreen(HISTORY_QUERY);

    expect(
      page.queryText(
        RESERVATION_HISTORY_COPY.FILTER_DATE_RANGE_ERROR
      )
    ).not.toBeInTheDocument();
    expect(
      page.getField(
        RESERVATION_HISTORY_COPY.FILTER_TO_LABEL
      )
    ).not.toHaveAttribute(INVALID_ATTRIBUTE);
  });

  it("explains an inverted range on Hasta and links it by aria-describedby", () => {
    const page = renderScreen(HISTORY_QUERY, true);
    const field = page.getField(
      RESERVATION_HISTORY_COPY.FILTER_TO_LABEL
    );

    expect(field).toHaveAttribute(
      INVALID_ATTRIBUTE,
      INVALID_TRUE_VALUE
    );
    expect(field).toHaveAttribute(DESCRIBED_BY_ATTRIBUTE);
    expect(page.getDescription(field)).toHaveTextContent(
      RESERVATION_HISTORY_COPY.FILTER_DATE_RANGE_ERROR
    );
  });

  it("claims no results when the range is inverted", () => {
    const page = renderScreen(HISTORY_QUERY, true);

    expect(
      page.queryText(
        RESERVATION_HISTORY_COPY.FILTERED_EMPTY_TITLE
      )
    ).not.toBeInTheDocument();
    expect(
      page.queryText(RESERVATION_HISTORY_COPY.EMPTY_TITLE)
    ).not.toBeInTheDocument();
  });

  it("says nothing matches the filters when a filtered page is empty", () => {
    const page = renderScreen(HISTORY_QUERY);

    expect(
      page.queryText(
        RESERVATION_HISTORY_COPY.FILTERED_EMPTY_TITLE
      )
    ).toBeInTheDocument();
    expect(
      page.queryText(RESERVATION_HISTORY_COPY.EMPTY_TITLE)
    ).not.toBeInTheDocument();
  });

  it("keeps the no records message when no filter is applied", () => {
    const page = renderScreen(HISTORY_UNFILTERED_QUERY);

    expect(
      page.queryText(RESERVATION_HISTORY_COPY.EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(
      page.queryText(
        RESERVATION_HISTORY_COPY.FILTERED_EMPTY_TITLE
      )
    ).not.toBeInTheDocument();
  });
});
