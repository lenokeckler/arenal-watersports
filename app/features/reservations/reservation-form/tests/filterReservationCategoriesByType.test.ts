import { describe, expect, it } from "vitest";
import { filterReservationCategoriesByType } from "../utils/filterReservationCategoriesByType";
import {
  EXPECTED_RENTAL_CATEGORY_IDS,
  EXPECTED_TOUR_CATEGORY_IDS,
  EXPECTED_COMBO_CATEGORY_IDS,
  RESERVATION_CATEGORY_OPTIONS,
  RESERVATION_TYPES,
  TOUR_RESERVATION_TYPE,
  COMBO_RESERVATION_TYPE,
  RENTAL_RESERVATION_TYPE,
} from "./filterReservationCategoriesByType.constants";

describe("filterReservationCategoriesByType", () => {
  it.each(RESERVATION_TYPES)(
    "filters guide-only categories for %s",
    (reservationType) => {
      const categories = filterReservationCategoriesByType(
        RESERVATION_CATEGORY_OPTIONS,
        reservationType
      );
      const expectedIds = {
        [TOUR_RESERVATION_TYPE]: EXPECTED_TOUR_CATEGORY_IDS,
        [COMBO_RESERVATION_TYPE]:
          EXPECTED_COMBO_CATEGORY_IDS,
        [RENTAL_RESERVATION_TYPE]:
          EXPECTED_RENTAL_CATEGORY_IDS,
      }[reservationType];

      expect(
        categories.map((category) => category.id)
      ).toEqual(expectedIds);
    }
  );
});
