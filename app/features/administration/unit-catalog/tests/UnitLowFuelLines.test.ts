import { describe, expect, it } from "vitest";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { findUnitFuelErrors } from "../utils/findUnitFuelErrors";
import { mapUnitFormValuesToInput } from "../utils/mapUnitFormValuesToInput";
import { mapUnitRowToFormValues } from "../utils/mapUnitRowToFormValues";
import {
  DEFAULT_UNIT,
  DEFAULT_UNIT_FORM_VALUES,
} from "./Unit.constants";

const LINES = {
  ABOVE_GAUGE: "7",
  ABOVE_LIMIT: "21",
  FRACTION: "1.5",
  GAUGE: "6",
  OWN: "2",
  OWN_NUMBER: 2,
  STORED: 3,
  ZERO: "0",
} as const;

const MOTOR_RULES = { hasMotor: true };
const MOTORLESS_RULES = { hasMotor: false };

describe("findUnitFuelErrors own low fuel warning", () => {
  it("accepts an empty warning: the unit uses the one of its category", () => {
    expect(
      findUnitFuelErrors({
        fuelLevel: "",
        fuelMax: LINES.GAUGE,
        lowFuelLines: "",
      })
    ).toEqual({});
  });

  it("accepts a warning that fits inside the gauge", () => {
    expect(
      findUnitFuelErrors({
        fuelLevel: "",
        fuelMax: LINES.GAUGE,
        lowFuelLines: LINES.OWN,
      })
    ).toEqual({});
  });

  it("refuses a warning above the lines of the gauge", () => {
    expect(
      findUnitFuelErrors({
        fuelLevel: "",
        fuelMax: LINES.GAUGE,
        lowFuelLines: LINES.ABOVE_GAUGE,
      }).lowFuelLines
    ).toBe(UNIT_FORM_ERROR_COPY.LOW_FUEL_LINES_ABOVE_MAX);
  });

  it.each([LINES.ZERO, LINES.FRACTION, "abc"])(
    "refuses %j as a warning",
    (text) => {
      expect(
        findUnitFuelErrors({
          fuelLevel: "",
          fuelMax: LINES.GAUGE,
          lowFuelLines: text,
        }).lowFuelLines
      ).toBe(UNIT_FORM_ERROR_COPY.LOW_FUEL_LINES_INVALID);
    }
  );

  it("compares against the largest gauge while the gauge itself is wrong", () => {
    expect(
      findUnitFuelErrors({
        fuelLevel: "",
        fuelMax: "x",
        lowFuelLines: LINES.ABOVE_LIMIT,
      }).lowFuelLines
    ).toBe(UNIT_FORM_ERROR_COPY.LOW_FUEL_LINES_ABOVE_MAX);
  });
});

describe("unit low fuel warning mapping", () => {
  it("turns the typed warning into a number", () => {
    expect(
      mapUnitFormValuesToInput(
        {
          ...DEFAULT_UNIT_FORM_VALUES,
          lowFuelLines: LINES.OWN,
        },
        MOTOR_RULES
      ).lowFuelLines
    ).toBe(LINES.OWN_NUMBER);
  });

  it("turns an empty warning into none", () => {
    expect(
      mapUnitFormValuesToInput(
        { ...DEFAULT_UNIT_FORM_VALUES, lowFuelLines: "" },
        MOTOR_RULES
      ).lowFuelLines
    ).toBeNull();
  });

  it("never carries a warning for a unit without a motor", () => {
    expect(
      mapUnitFormValuesToInput(
        {
          ...DEFAULT_UNIT_FORM_VALUES,
          lowFuelLines: LINES.OWN,
        },
        MOTORLESS_RULES
      ).lowFuelLines
    ).toBeNull();
  });

  it("writes the stored warning back as text and none as empty text", () => {
    expect(
      mapUnitRowToFormValues({
        ...DEFAULT_UNIT,
        lowFuelLines: LINES.STORED,
      }).lowFuelLines
    ).toBe(String(LINES.STORED));
    expect(
      mapUnitRowToFormValues(DEFAULT_UNIT).lowFuelLines
    ).toBe("");
  });
});
