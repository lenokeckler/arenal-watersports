import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { buildReservationHistoryCategoryFilterOptions } from "../utils/buildReservationHistoryCategoryFilterOptions";
import {
  FILTER_ACTIVE_CATEGORY,
  FILTER_CATEGORY_OPTIONS,
  FILTER_INACTIVE_CATEGORY,
  FILTER_UNLISTED_CATEGORY_ID,
} from "./ReservationHistoryFiltersForm.constants";

const labelsFor = (selectedId: string) =>
  buildReservationHistoryCategoryFilterOptions(
    FILTER_CATEGORY_OPTIONS,
    selectedId
  ).map(({ label }) => label);

describe("buildReservationHistoryCategoryFilterOptions", () => {
  it("lists the all option first and every category after it", () => {
    expect(labelsFor(STRING.Empty)).toEqual([
      RESERVATION_HISTORY_COPY.FILTER_ALL,
      FILTER_ACTIVE_CATEGORY.name,
      FILTER_INACTIVE_CATEGORY.name,
    ]);
  });

  it("adds nothing when the selected category is listed", () => {
    expect(labelsFor(FILTER_ACTIVE_CATEGORY.id)).toEqual([
      RESERVATION_HISTORY_COPY.FILTER_ALL,
      FILTER_ACTIVE_CATEGORY.name,
      FILTER_INACTIVE_CATEGORY.name,
    ]);
  });

  it("adds the selected category as unavailable when it is not listed", () => {
    const options =
      buildReservationHistoryCategoryFilterOptions(
        FILTER_CATEGORY_OPTIONS,
        FILTER_UNLISTED_CATEGORY_ID
      );

    expect(options.at(-1)).toEqual({
      key: FILTER_UNLISTED_CATEGORY_ID,
      label:
        RESERVATION_HISTORY_COPY.FILTER_CATEGORY_UNAVAILABLE,
      value: FILTER_UNLISTED_CATEGORY_ID,
    });
  });
});
