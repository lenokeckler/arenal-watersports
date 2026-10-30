import { describe, expect, it } from "vitest";
import { UNIT_MOTORLESS_DEFAULTS } from "../constants/UnitMotorlessDefaults.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import { mapUnitFormValuesToInput } from "../utils/mapUnitFormValuesToInput";
import { mapUnitRowToFormValues } from "../utils/mapUnitRowToFormValues";
import { mapUnitRowToUnit } from "../utils/mapUnitRowToUnit";
import {
  buildUnitFormValues,
  buildUnitRow,
  DEFAULT_UNIT,
  DEFAULT_UNIT_FORM_VALUES,
  DEFAULT_UNIT_ROW,
} from "./Unit.constants";

const MOTOR_RULES = { hasMotor: true };
const MOTORLESS_RULES = { hasMotor: false };

describe("mapUnitFormValuesToInput", () => {
  it("parses the numbers and trims the code", () => {
    expect(
      mapUnitFormValuesToInput(
        buildUnitFormValues({
          code: " JET-01 ",
          usageTotal: "12,5",
        }),
        MOTOR_RULES
      )
    ).toEqual({
      code: "JET-01",
      status: UNIT_STATUS.AVAILABLE,
      fuelMax: 6,
      fuelLevel: 3,
      usageTotal: 12.5,
      nextOilChangeAt: 50,
    });
  });

  it.each([
    { fuelLevel: "", expected: null },
    { fuelLevel: "0", expected: 0 },
  ])(
    "maps the fuel reading $fuelLevel to $expected",
    ({ fuelLevel, expected }) => {
      const input = mapUnitFormValuesToInput(
        buildUnitFormValues({ fuelLevel }),
        MOTOR_RULES
      );

      expect(input.fuelLevel).toBe(expected);
    }
  );

  it("maps empty usage to zero and an empty oil change to null", () => {
    const input = mapUnitFormValuesToInput(
      buildUnitFormValues({
        usageTotal: "",
        nextOilChangeAt: "",
      }),
      MOTOR_RULES
    );

    expect(input).toMatchObject({
      usageTotal: 0,
      nextOilChangeAt: null,
    });
  });

  it("stores the defaults when the category has no motor", () => {
    expect(
      mapUnitFormValuesToInput(
        DEFAULT_UNIT_FORM_VALUES,
        MOTORLESS_RULES
      )
    ).toMatchObject(UNIT_MOTORLESS_DEFAULTS);
  });
});

describe("mapUnitRowToUnit", () => {
  it("renames every column to the read model", () => {
    expect(mapUnitRowToUnit(DEFAULT_UNIT_ROW)).toEqual(
      DEFAULT_UNIT
    );
  });
});

describe("mapUnitRowToFormValues", () => {
  it("writes the values back as text", () => {
    expect(mapUnitRowToFormValues(DEFAULT_UNIT)).toEqual(
      DEFAULT_UNIT_FORM_VALUES
    );
  });

  it("writes null readings as empty text", () => {
    const unit = mapUnitRowToUnit(
      buildUnitRow({
        fuel_level: null,
        next_oil_change_at: null,
      })
    );

    expect(mapUnitRowToFormValues(unit)).toMatchObject({
      fuelLevel: "",
      nextOilChangeAt: "",
    });
  });
});
