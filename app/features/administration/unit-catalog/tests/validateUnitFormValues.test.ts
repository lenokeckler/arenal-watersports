import { describe, expect, it } from "vitest";
import { validateUnitFormValues } from "../utils/validateUnitFormValues";
import { buildUnitFormValues } from "./Unit.constants";
import {
  UNIT_CODE_CASES,
  UNIT_DECIMAL_CASES,
  UNIT_FUEL_CASES,
  UNIT_MOTORLESS_CASES,
  UNIT_STATUS_CASES,
} from "./UnitFormRuleCases.constants";

const MOTOR_RULES = { hasMotor: true };

describe("validateUnitFormValues", () => {
  it.each([
    ...UNIT_CODE_CASES,
    ...UNIT_STATUS_CASES,
    ...UNIT_FUEL_CASES,
    ...UNIT_DECIMAL_CASES,
    ...UNIT_MOTORLESS_CASES,
  ])(
    "judges $description",
    ({
      overrides,
      rules = MOTOR_RULES,
      expectedErrors,
    }) => {
      expect(
        validateUnitFormValues(
          buildUnitFormValues(overrides),
          rules
        )
      ).toStrictEqual(expectedErrors);
    }
  );
});
