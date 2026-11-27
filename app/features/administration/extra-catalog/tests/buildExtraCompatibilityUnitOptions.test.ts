import { describe, expect, it } from "vitest";
import { EXTRA_COMPATIBILITY_UNIT_STATUS_COPY } from "../constants/ExtraCompatibilityUnitStatusCopy.constants";
import { buildExtraCompatibilityUnitOptions } from "../utils/buildExtraCompatibilityUnitOptions";
import {
  COMPATIBILITY_UNITS,
  FREE_COMPATIBILITY_UNIT,
  FREE_UNIT_ID,
  LINKED_COMPATIBILITY_UNIT,
  LINKED_UNIT_ID,
} from "./ExtraCompatibility.constants";

describe("buildExtraCompatibilityUnitOptions", () => {
  it("shows the code and the status word of every unit", () => {
    const options = buildExtraCompatibilityUnitOptions(
      COMPATIBILITY_UNITS.units,
      []
    );

    expect(
      options.map(({ code, statusLabel }) => ({
        code,
        statusLabel,
      }))
    ).toStrictEqual([
      {
        code: LINKED_COMPATIBILITY_UNIT.code,
        statusLabel:
          EXTRA_COMPATIBILITY_UNIT_STATUS_COPY[
            LINKED_COMPATIBILITY_UNIT.status
          ],
      },
      {
        code: FREE_COMPATIBILITY_UNIT.code,
        statusLabel:
          EXTRA_COMPATIBILITY_UNIT_STATUS_COPY[
            FREE_COMPATIBILITY_UNIT.status
          ],
      },
    ]);
  });

  it("checks the units in the selection and no other", () => {
    const options = buildExtraCompatibilityUnitOptions(
      COMPATIBILITY_UNITS.units,
      [FREE_UNIT_ID]
    );

    expect(
      options.map(({ id, isChecked }) => ({
        id,
        isChecked,
      }))
    ).toStrictEqual([
      { id: LINKED_UNIT_ID, isChecked: false },
      { id: FREE_UNIT_ID, isChecked: true },
    ]);
  });
});
