import { describe, expect, it } from "vitest";
import { COMBO_ITEM_QUANTITY_STEP } from "../constants/ComboItemQuantity.constants";
import { stepComboItemQuantity } from "../utils/stepComboItemQuantity";

describe("stepComboItemQuantity", () => {
  it.each([
    ["2", COMBO_ITEM_QUANTITY_STEP.INCREASE, "3"],
    ["2", COMBO_ITEM_QUANTITY_STEP.DECREASE, "1"],
    ["1", COMBO_ITEM_QUANTITY_STEP.DECREASE, "1"],
    ["", COMBO_ITEM_QUANTITY_STEP.INCREASE, "1"],
    ["", COMBO_ITEM_QUANTITY_STEP.DECREASE, "1"],
    ["abc", COMBO_ITEM_QUANTITY_STEP.INCREASE, "1"],
    [" 4 ", COMBO_ITEM_QUANTITY_STEP.INCREASE, "5"],
  ])(
    "turns %j with step %i into %j",
    (text, step, expected) => {
      expect(stepComboItemQuantity(text, step)).toBe(
        expected
      );
    }
  );
});
