import { describe, expect, it } from "vitest";
import { RESERVATION_POSTPONEMENT_BLOCK } from "../constants/ReservationPostponementBlock.constants";
import { mapReservationPostponement } from "../utils/mapReservationPostponement";
import {
  CLOSED_UNIT_ITEM_ROW,
  COSTA_RICA_MIDNIGHT_CASES,
  DISPATCH_MISSING_UNIT_ITEM_ROW,
  DISPATCHED_ROW,
  EXPECTED_FUEL_READING_UNIT,
  EXPECTED_PLAIN_READING_UNIT,
  EXPECTED_UNREAD_FUEL_READING_UNIT,
  EXPECTED_KILOMETERS_READING_UNIT,
  EXPECTED_SCHEDULED,
  FUEL_ONLY_UNIT_ITEM_ROW,
  NOT_POSTPONABLE_STATUS_CASES,
  PLAIN_OPEN_UNIT_ITEM_ROW,
  POSTPONEMENT_UPDATED_AT,
  QUANTITY_ITEM_ROW,
  SCHEDULED_ROW,
  UNREAD_FUEL_UNIT_ITEM_ROW,
} from "./ReservationPostponement.constants";

describe("mapReservationPostponement", () => {
  it("maps a scheduled reservation without extras or readings, sorted by id", () => {
    expect(
      mapReservationPostponement(SCHEDULED_ROW)
    ).toEqual(EXPECTED_SCHEDULED);
  });

  it("keeps the raw updated_at string as the stale token", () => {
    expect(
      mapReservationPostponement(SCHEDULED_ROW)
        .expectedUpdatedAt
    ).toBe(POSTPONEMENT_UPDATED_AT);
  });

  it("lists only the open dispatched units as reading units, in id order", () => {
    const postponement =
      mapReservationPostponement(DISPATCHED_ROW);

    expect(postponement.isDispatched).toBe(true);
    expect(postponement.block).toBe(
      RESERVATION_POSTPONEMENT_BLOCK.NONE
    );
    expect(postponement.readingUnits).toEqual([
      EXPECTED_FUEL_READING_UNIT,
      EXPECTED_KILOMETERS_READING_UNIT,
    ]);
  });

  it("leaves units of a closed dispatch group out of the readings but in the equipment", () => {
    const postponement =
      mapReservationPostponement(DISPATCHED_ROW);

    expect(
      postponement.readingUnits.map((unit) => unit.itemId)
    ).not.toContain(CLOSED_UNIT_ITEM_ROW.id);
    expect(
      postponement.equipment.map((line) => line.id)
    ).toContain(CLOSED_UNIT_ITEM_ROW.id);
  });

  it("leaves a by-quantity item out of the readings", () => {
    const postponement =
      mapReservationPostponement(DISPATCHED_ROW);

    expect(
      postponement.readingUnits.map((unit) => unit.itemId)
    ).not.toContain(QUANTITY_ITEM_ROW.id);
  });

  it("gives no fuel limits to a category that burns no fuel", () => {
    const unit = mapReservationPostponement(
      DISPATCHED_ROW
    ).readingUnits.find(
      ({ itemId }) =>
        itemId === EXPECTED_KILOMETERS_READING_UNIT.itemId
    );

    expect(unit?.fuelMax).toBeNull();
    expect(unit?.fuelOut).toBeNull();
    expect(unit?.usageMetric).toBe(
      EXPECTED_KILOMETERS_READING_UNIT.usageMetric
    );
  });

  it("gives a unit with neither fuel nor meter no limits and no readings", () => {
    const postponement = mapReservationPostponement({
      ...DISPATCHED_ROW,
      reservation_items: [PLAIN_OPEN_UNIT_ITEM_ROW],
    });

    expect(postponement.readingUnits).toEqual([
      EXPECTED_PLAIN_READING_UNIT,
    ]);
  });

  it("keeps null out readings as null instead of zero", () => {
    const postponement = mapReservationPostponement({
      ...DISPATCHED_ROW,
      reservation_items: [UNREAD_FUEL_UNIT_ITEM_ROW],
    });

    expect(postponement.readingUnits).toEqual([
      EXPECTED_UNREAD_FUEL_READING_UNIT,
    ]);
  });

  it("reads no usage out for a fuel-only category even when one is stored", () => {
    const postponement = mapReservationPostponement({
      ...DISPATCHED_ROW,
      reservation_items: [FUEL_ONLY_UNIT_ITEM_ROW],
    });

    expect(postponement.readingUnits).toHaveLength(1);
    expect(postponement.readingUnits[0].fuelOut).toBe(3);
    expect(
      postponement.readingUnits[0].usageOut
    ).toBeNull();
  });

  it("excludes a dispatched item whose dispatch was not loaded", () => {
    const postponement = mapReservationPostponement({
      ...DISPATCHED_ROW,
      reservation_items: [DISPATCH_MISSING_UNIT_ITEM_ROW],
    });

    expect(postponement.readingUnits).toEqual([]);
  });

  it.each(NOT_POSTPONABLE_STATUS_CASES)(
    "blocks a %s reservation",
    (status) => {
      const postponement = mapReservationPostponement({
        ...SCHEDULED_ROW,
        status,
      });

      expect(postponement.block).toBe(
        RESERVATION_POSTPONEMENT_BLOCK.NOT_POSTPONABLE
      );
      expect(postponement.isDispatched).toBe(false);
    }
  );

  it.each(COSTA_RICA_MIDNIGHT_CASES)(
    "reads %s as Costa Rica %s at %s",
    (startsAt, date, time) => {
      const postponement = mapReservationPostponement({
        ...SCHEDULED_ROW,
        starts_at: startsAt,
      });

      expect(postponement.date).toBe(date);
      expect(postponement.time).toBe(time);
    }
  );
});
