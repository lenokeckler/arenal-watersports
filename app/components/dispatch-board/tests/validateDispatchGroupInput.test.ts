import { describe, expect, it } from "vitest";
import { DISPATCH_SHEET_ERROR } from "../constants/DispatchSheet.constants";
import type { DispatchUnitReading } from "../models/DispatchUnitReading.interface";
import { validateDispatchGroupInput } from "../utils/validateDispatchGroupInput";
import {
  DISPATCH_INPUT_FIXTURE,
  DISPATCH_READING_FIXTURE,
  DISPATCH_TOO_MANY_UNITS,
} from "./DispatchSheetTest.constants";

const VALID_INPUT = {
  categoryId: DISPATCH_INPUT_FIXTURE.CATEGORY_ID,
  departureAt: DISPATCH_INPUT_FIXTURE.DEPARTURE_AT,
  readings: [],
  reservationId: DISPATCH_INPUT_FIXTURE.RESERVATION_ID,
  returnsAt: DISPATCH_INPUT_FIXTURE.RETURNS_AT,
  unitIds: [DISPATCH_INPUT_FIXTURE.UNIT_ID],
};

const buildReading = (
  override: Partial<DispatchUnitReading> = {}
): DispatchUnitReading => ({
  fuel: DISPATCH_READING_FIXTURE.FUEL,
  unitId: DISPATCH_INPUT_FIXTURE.UNIT_ID,
  usage: DISPATCH_READING_FIXTURE.USAGE,
  ...override,
});

describe("validateDispatchGroupInput", () => {
  it("accepts a well formed dispatch", () => {
    expect(() =>
      validateDispatchGroupInput(VALID_INPUT)
    ).not.toThrow();
  });

  it("accepts a reading for each chosen unit", () => {
    expect(() =>
      validateDispatchGroupInput({
        ...VALID_INPUT,
        readings: [buildReading()],
      })
    ).not.toThrow();
  });

  it("accepts a reading with only one of the two values", () => {
    expect(() =>
      validateDispatchGroupInput({
        ...VALID_INPUT,
        readings: [buildReading({ fuel: null })],
      })
    ).not.toThrow();
  });

  it.each([
    [
      "a reservation that is not a uuid",
      { reservationId: DISPATCH_INPUT_FIXTURE.NOT_A_UUID },
    ],
    [
      "a category that is not a uuid",
      { categoryId: DISPATCH_INPUT_FIXTURE.NOT_A_UUID },
    ],
    [
      "a unit that is not a uuid",
      { unitIds: [DISPATCH_INPUT_FIXTURE.NOT_A_UUID] },
    ],
    [
      "too many units",
      { unitIds: DISPATCH_TOO_MANY_UNITS },
    ],
    [
      "a departure that is not a date",
      { departureAt: DISPATCH_INPUT_FIXTURE.NOT_A_DATE },
    ],
    [
      "a return that is not a date",
      { returnsAt: DISPATCH_INPUT_FIXTURE.NOT_A_DATE },
    ],
    [
      "a reading for a unit outside the dispatch",
      {
        readings: [
          buildReading({
            unitId: DISPATCH_READING_FIXTURE.OTHER_UNIT_ID,
          }),
        ],
      },
    ],
    [
      "two readings for the same unit",
      { readings: [buildReading(), buildReading()] },
    ],
    [
      "fuel with a fraction of a line",
      {
        readings: [
          buildReading({
            fuel: DISPATCH_READING_FIXTURE.FRACTION_FUEL,
          }),
        ],
      },
    ],
    [
      "fuel above any gauge",
      {
        readings: [
          buildReading({
            fuel: DISPATCH_READING_FIXTURE.FUEL_OVER_GAUGE,
          }),
        ],
      },
    ],
    [
      "negative usage",
      {
        readings: [
          buildReading({
            usage: DISPATCH_READING_FIXTURE.NEGATIVE_USAGE,
          }),
        ],
      },
    ],
    [
      "usage with three decimals",
      {
        readings: [
          buildReading({
            usage:
              DISPATCH_READING_FIXTURE.THREE_DECIMALS_USAGE,
          }),
        ],
      },
    ],
    [
      "usage beyond the column",
      {
        readings: [
          buildReading({
            usage: DISPATCH_READING_FIXTURE.TOO_BIG_USAGE,
          }),
        ],
      },
    ],
    [
      "a return before the departure",
      { returnsAt: DISPATCH_INPUT_FIXTURE.DEPARTURE_AT },
    ],
  ])("refuses %s", (_label, override) => {
    expect(() =>
      validateDispatchGroupInput({
        ...VALID_INPUT,
        ...override,
      })
    ).toThrow(DISPATCH_SHEET_ERROR.INVALID_INPUT);
  });
});
