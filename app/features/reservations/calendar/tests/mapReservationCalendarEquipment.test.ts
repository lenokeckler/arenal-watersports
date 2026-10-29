import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_ERROR } from "../constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarItemSource } from "../models/ReservationCalendarItemSource.interface";
import { mapReservationCalendarEquipment } from "../utils/mapReservationCalendarEquipment";
import {
  CALENDAR_CATEGORY,
  CALENDAR_UNIT_CODE,
  CATEGORY_COMMITMENT,
  EXTRA_COMMITMENT,
  EMPTY_CALENDAR_LABEL,
  UNIT_COMMITMENT,
} from "./ReservationCalendar.constants";

describe("equipment facts", (): void => {
  it("retains category quantity without inventing a unit", (): void => {
    expect(
      mapReservationCalendarEquipment(CATEGORY_COMMITMENT)
    ).toEqual({
      categoryId: CALENDAR_CATEGORY.id,
      categoryName: CALENDAR_CATEGORY.name,
      quantity: CATEGORY_COMMITMENT.quantity,
      unitCode: null,
    });
  });

  it("reports the actual concrete unit as one commitment", (): void => {
    expect(
      mapReservationCalendarEquipment(UNIT_COMMITMENT)
    ).toEqual({
      categoryId: CALENDAR_CATEGORY.id,
      categoryName: CALENDAR_CATEGORY.name,
      quantity: 1,
      unitCode: UNIT_COMMITMENT.unit?.code,
    });
  });
});

describe("commitment shapes", (): void => {
  it("excludes monetary extras only when no equipment is committed", (): void => {
    expect(
      mapReservationCalendarEquipment(EXTRA_COMMITMENT)
    ).toBeNull();
    expect(
      mapReservationCalendarEquipment({
        ...CATEGORY_COMMITMENT,
        extra_id: EXTRA_COMMITMENT.extra_id,
      })
    ).not.toBeNull();
    expect(
      mapReservationCalendarEquipment({
        ...UNIT_COMMITMENT,
        extra_id: EXTRA_COMMITMENT.extra_id,
      })
    ).not.toBeNull();
  });

  it.each([null, 0, -1, 1.5, Number.NaN])(
    "rejects invalid category quantity %s",
    (quantity): void => {
      expect(() =>
        mapReservationCalendarEquipment({
          ...CATEGORY_COMMITMENT,
          quantity,
        })
      ).toThrow(
        RESERVATION_CALENDAR_ERROR.INVALID_EQUIPMENT
      );
    }
  );
});

describe("category relations", (): void => {
  it.each<Partial<ReservationCalendarItemSource>>([
    { category: null },
    {
      category: {
        ...CALENDAR_CATEGORY,
        name: EMPTY_CALENDAR_LABEL,
      },
    },
    { category_id: UNIT_COMMITMENT.unit_id },
    { unit_id: UNIT_COMMITMENT.unit_id },
    { unit: UNIT_COMMITMENT.unit },
  ])(
    "rejects missing or inconsistent category relations %j",
    (overrides): void => {
      expect(() =>
        mapReservationCalendarEquipment({
          ...CATEGORY_COMMITMENT,
          ...overrides,
        })
      ).toThrow(
        RESERVATION_CALENDAR_ERROR.INVALID_EQUIPMENT
      );
    }
  );
});

describe("unit relations", (): void => {
  it.each<Partial<ReservationCalendarItemSource>>([
    { unit: null },
    {
      unit: {
        category: CALENDAR_CATEGORY,
        code: EMPTY_CALENDAR_LABEL,
      },
    },
    {
      unit: {
        category: null,
        code: CALENDAR_UNIT_CODE,
      },
    },
    { category_id: CALENDAR_CATEGORY.id },
    { category: CALENDAR_CATEGORY },
    { quantity: CATEGORY_COMMITMENT.quantity },
  ])(
    "rejects missing or contradictory unit relations %j",
    (overrides): void => {
      expect(() =>
        mapReservationCalendarEquipment({
          ...UNIT_COMMITMENT,
          ...overrides,
        })
      ).toThrow(
        RESERVATION_CALENDAR_ERROR.INVALID_EQUIPMENT
      );
    }
  );
});

describe("empty commitments", (): void => {
  it("rejects an empty commitment instead of hiding it", (): void => {
    expect(() =>
      mapReservationCalendarEquipment({
        ...EXTRA_COMMITMENT,
        extra_id: null,
      })
    ).toThrow(RESERVATION_CALENDAR_ERROR.INVALID_EQUIPMENT);
  });
});
