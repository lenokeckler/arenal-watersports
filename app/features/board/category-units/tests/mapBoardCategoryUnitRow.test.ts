import { describe, expect, it } from "vitest";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { mapBoardCategoryUnitRow } from "../utils/mapBoardCategoryUnitRow";
import { CATEGORY_UNITS_ERROR } from "../constants/CategoryUnits.constants";
import {
  DEFAULT_CATEGORY_UNIT,
  NOW,
  RETURNS_EXACTLY_NOW,
  RETURNS_ONE_MS_BEFORE_NOW,
  DEFAULT_UNIT_OCCUPANCY,
  OCCUPIED_CATEGORY_UNIT,
} from "./CategoryUnits.constants";
import {
  DEFAULT_BOARD_UNIT_ROW,
  INCOMPLETE_OCCUPIED_ROW_OVERRIDES,
  OCCUPIED_BOARD_UNIT_ROW,
} from "./CategoryUnitRows.constants";

describe("mapBoardCategoryUnitRow", () => {
  it("maps an available row without occupancy", () => {
    expect(
      mapBoardCategoryUnitRow(DEFAULT_BOARD_UNIT_ROW, NOW)
    ).toEqual(DEFAULT_CATEGORY_UNIT);
  });

  it("maps an occupied row with its occupancy, keeping the reservation id", () => {
    const unit = mapBoardCategoryUnitRow(
      OCCUPIED_BOARD_UNIT_ROW,
      NOW
    );

    expect(unit).toEqual(OCCUPIED_CATEGORY_UNIT);
    expect(unit.occupancy?.reservationId).toBe(
      DEFAULT_UNIT_OCCUPANCY.reservationId
    );
  });

  it("never carries occupancy on a unit that is not occupied", () => {
    const unit = mapBoardCategoryUnitRow(
      {
        ...OCCUPIED_BOARD_UNIT_ROW,
        effective_status:
          INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
      },
      NOW
    );

    expect(unit.status).toBe(
      INVENTORY_UNIT_STATUS.IN_MAINTENANCE
    );
    expect(unit.occupancy).toBeNull();
  });

  it.each(INCOMPLETE_OCCUPIED_ROW_OVERRIDES)(
    "throws when an occupied row misses a column: %o",
    (override) => {
      expect(() =>
        mapBoardCategoryUnitRow(
          {
            ...OCCUPIED_BOARD_UNIT_ROW,
            ...override,
          },
          NOW
        )
      ).toThrow(CATEGORY_UNITS_ERROR.INCOMPLETE_OCCUPANCY);
    }
  );

  it("is not overdue when the return is exactly now", () => {
    const unit = mapBoardCategoryUnitRow(
      {
        ...OCCUPIED_BOARD_UNIT_ROW,
        returns_at: RETURNS_EXACTLY_NOW,
      },
      NOW
    );

    expect(unit.occupancy?.isOverdue).toBe(false);
  });

  it("is overdue as soon as the return is in the past", () => {
    const unit = mapBoardCategoryUnitRow(
      {
        ...OCCUPIED_BOARD_UNIT_ROW,
        returns_at: RETURNS_ONE_MS_BEFORE_NOW,
      },
      NOW
    );

    expect(unit.occupancy?.isOverdue).toBe(true);
    expect(unit.status).toBe(
      INVENTORY_UNIT_STATUS.OCCUPIED
    );
  });
});
