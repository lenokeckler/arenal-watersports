import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { mapComboToFormValues } from "../utils/mapComboToFormValues";
import { FOREIGN_PRICE } from "./Combo.constants";
import {
  DEFAULT_COMBO_FOR_EDIT,
  FAKE_CATEGORY_ID,
  FAKE_COMBO_NAME,
  FIRST_ITEM_QUANTITY,
} from "./ComboForm.constants";

describe("mapComboToFormValues", () => {
  it("turns the saved combo into text values", () => {
    expect(
      mapComboToFormValues(DEFAULT_COMBO_FOR_EDIT)
    ).toEqual({
      audience: DEFAULT_COMBO_FOR_EDIT.audience,
      items: [
        {
          categoryId: FAKE_CATEGORY_ID,
          quantityText: FIRST_ITEM_QUANTITY.toString(),
        },
      ],
      name: FAKE_COMBO_NAME,
      priceText: FOREIGN_PRICE.toString(),
    });
  });

  it("leaves the price text empty when the combo has no price", () => {
    expect(
      mapComboToFormValues({
        ...DEFAULT_COMBO_FOR_EDIT,
        packagePrice: null,
      }).priceText
    ).toBe(STRING.Empty);
  });
});
