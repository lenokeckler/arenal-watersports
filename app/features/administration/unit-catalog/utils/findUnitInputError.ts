import type { NullableUndefined } from "@/app/types";
import type { UnitFields } from "../models/UnitFields.interface";
import { validateUnitFormValues } from "./validateUnitFormValues";

const WITH_MOTOR_RULES = { hasMotor: true };

export const findUnitInputError = (
  input: UnitFields
): NullableUndefined<string> =>
  Object.values(
    validateUnitFormValues(
      {
        code: input.code,
        status: input.status,
        fuelMax: String(input.fuelMax),
        fuelLevel: input.fuelLevel?.toString() ?? "",
        usageTotal: String(input.usageTotal),
        nextOilChangeAt:
          input.nextOilChangeAt?.toString() ?? "",
      },
      WITH_MOTOR_RULES
    )
  )[0];
