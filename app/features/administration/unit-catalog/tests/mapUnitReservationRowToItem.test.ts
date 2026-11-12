import { describe, expect, it } from "vitest";
import { mapUnitReservationRowToItem } from "../utils/mapUnitReservationRowToItem";
import {
  DEFAULT_UNIT_RESERVATION_ITEM,
  DEFAULT_UNIT_RESERVATION_ROW,
} from "./UnitReservationHistory.constants";

describe("mapUnitReservationRowToItem", () => {
  it("maps the database columns to the reservation item", () => {
    expect(
      mapUnitReservationRowToItem(
        DEFAULT_UNIT_RESERVATION_ROW
      )
    ).toEqual(DEFAULT_UNIT_RESERVATION_ITEM);
  });
});
