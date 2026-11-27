import { describe, expect, it } from "vitest";
import { parseSetExtraCompatibilityInput } from "../utils/parseSetExtraCompatibilityInput";
import { NON_STRING_EXTRA_NAMES } from "./ExtraActions.constants";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_EXTRA_ID,
  LINKED_UNIT_ID,
} from "./ExtraCompatibility.constants";

const VALID_INPUT = {
  extraId: COMPATIBILITY_EXTRA_ID,
  categoryId: COMPATIBILITY_CATEGORY_ID,
  unitIds: [LINKED_UNIT_ID],
};

const MALFORMED_ID = "not-a-uuid";

describe("parseSetExtraCompatibilityInput", () => {
  it("returns the ids of a valid input", () => {
    expect(
      parseSetExtraCompatibilityInput(VALID_INPUT)
    ).toEqual(VALID_INPUT);
  });

  it("accepts an empty selection", () => {
    expect(
      parseSetExtraCompatibilityInput({
        ...VALID_INPUT,
        unitIds: [],
      })
    ).toEqual({ ...VALID_INPUT, unitIds: [] });
  });

  it.each(NON_STRING_EXTRA_NAMES)(
    "returns null when the whole input is %j",
    (input) => {
      expect(
        parseSetExtraCompatibilityInput(input)
      ).toBeNull();
    }
  );

  it.each([
    { ...VALID_INPUT, extraId: MALFORMED_ID },
    { ...VALID_INPUT, categoryId: undefined },
    { ...VALID_INPUT, unitIds: LINKED_UNIT_ID },
    {
      ...VALID_INPUT,
      unitIds: [LINKED_UNIT_ID, MALFORMED_ID],
    },
    { ...VALID_INPUT, unitIds: [null] },
  ])("returns null for %j", (input) => {
    expect(
      parseSetExtraCompatibilityInput(input)
    ).toBeNull();
  });
});
