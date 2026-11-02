import { describe, expect, it } from "vitest";
import { mergeReservationEditCategories } from "../utils/mergeReservationEditCategories";
import {
  RESERVATION_EDIT_CATEGORY_EQUIPMENT,
  RESERVATION_EDIT_TEST,
  RESERVATION_EDIT_UNIT_EQUIPMENT,
} from "./ReservationEdit.constants";

const CURRENT_CATEGORY = {
  id: RESERVATION_EDIT_TEST.CATEGORY_ID,
  name: RESERVATION_EDIT_TEST.CATEGORY_NAME,
};

describe("mergeReservationEditCategories", () => {
  it("keeps a catalog that offers the current category", () => {
    expect(
      mergeReservationEditCategories(
        [CURRENT_CATEGORY],
        RESERVATION_EDIT_UNIT_EQUIPMENT
      )
    ).toEqual([CURRENT_CATEGORY]);
  });

  it.each([
    [false, RESERVATION_EDIT_UNIT_EQUIPMENT],
    [true, RESERVATION_EDIT_CATEGORY_EQUIPMENT],
  ])(
    "adds a dropped category with interchangeable %s",
    (isInterchangeable, equipment) => {
      expect(
        mergeReservationEditCategories([], equipment)
      ).toEqual([
        { ...CURRENT_CATEGORY, isInterchangeable },
      ]);
    }
  );
});
