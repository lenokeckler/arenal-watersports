import { describe, expect, it } from "vitest";
import { filterReservationCategoriesByType } from "../utils/filterReservationCategoriesByType";
import {
  EXPECTED_RENTAL_CATEGORY_IDS,
  EXPECTED_TOUR_CATEGORY_IDS,
  RESERVATION_CATEGORY_OPTIONS,
  RESERVATION_TYPES,
  TOUR_RESERVATION_TYPE,
} from "./filterReservationCategoriesByType.constants";

describe("filterReservationCategoriesByType", () => {
  it.each(RESERVATION_TYPES)(
    "filters guide-only categories for %s",
    (reservationType) => {
      const categories = filterReservationCategoriesByType(
        RESERVATION_CATEGORY_OPTIONS,
        reservationType
      );
      const expectedIds =
        reservationType === TOUR_RESERVATION_TYPE
          ? EXPECTED_TOUR_CATEGORY_IDS
          : EXPECTED_RENTAL_CATEGORY_IDS;

      expect(
        categories.map((category) => category.id)
      ).toEqual(expectedIds);
    }
  );
});
