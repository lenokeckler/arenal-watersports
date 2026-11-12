import { describe, expect, it } from "vitest";
import { isValidCustomComboExtraSelection } from "../utils/isValidCustomComboExtraSelection";
import { CUSTOM_COMBO_EXTRA_SELECTION_TEST as test } from "./isValidCustomComboExtraSelection.constants";

describe("isValidCustomComboExtraSelection", () => {
  it("accepts an empty extra selection without a unit", () => {
    expect(
      isValidCustomComboExtraSelection([], null, test.ITEMS)
    ).toBe(true);
  });

  it("accepts extras tied to a selected concrete unit", () => {
    expect(
      isValidCustomComboExtraSelection(
        [test.EXTRA_ID],
        test.UNIT_ID,
        test.ITEMS
      )
    ).toBe(true);
  });

  it("rejects extras without their selected unit", () => {
    expect(
      isValidCustomComboExtraSelection(
        [test.EXTRA_ID],
        null,
        test.ITEMS
      )
    ).toBe(false);
  });

  it("rejects a unit that is not part of the combo", () => {
    expect(
      isValidCustomComboExtraSelection(
        [test.EXTRA_ID],
        test.OTHER_UNIT_ID,
        test.ITEMS
      )
    ).toBe(false);
  });

  it("rejects duplicated extra identifiers", () => {
    expect(
      isValidCustomComboExtraSelection(
        [test.EXTRA_ID, test.EXTRA_ID],
        test.UNIT_ID,
        test.ITEMS
      )
    ).toBe(false);
  });
});
