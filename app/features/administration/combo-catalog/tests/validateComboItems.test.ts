import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { validateComboItems } from "../utils/validateComboItems";
import {
  FAKE_CATEGORY_ID,
  INVALID_QUANTITY_TEXTS,
  SECOND_CATEGORY_ID,
  VALID_COMBO_FORM_VALUES,
} from "./ComboForm.constants";

const [firstItem, secondItem] =
  VALID_COMBO_FORM_VALUES.items;

describe("validateComboItems", () => {
  it("accepts rows with distinct categories and positive quantities", () => {
    const { itemErrors, itemsError } = validateComboItems(
      VALID_COMBO_FORM_VALUES.items
    );

    expect(itemsError).toBeUndefined();
    expect(itemErrors).toEqual([{}, {}]);
  });

  it("requires at least one item", () => {
    expect(validateComboItems([])).toEqual({
      itemErrors: [],
      itemsError: COMBO_FORM_COPY.ITEMS_REQUIRED_ERROR,
    });
  });

  it("flags a row without a category", () => {
    const { itemErrors } = validateComboItems([
      { ...firstItem, categoryId: STRING.Empty },
    ]);

    expect(itemErrors).toEqual([
      {
        categoryId: COMBO_FORM_COPY.CATEGORY_REQUIRED_ERROR,
      },
    ]);
  });

  it.each(INVALID_QUANTITY_TEXTS)(
    "flags the quantity %j",
    (quantityText) => {
      const { itemErrors } = validateComboItems([
        { ...firstItem, quantityText },
      ]);

      expect(itemErrors).toEqual([
        {
          quantity: COMBO_FORM_COPY.QUANTITY_INVALID_ERROR,
        },
      ]);
    }
  );

  it("flags the second occurrence of a repeated category only", () => {
    const { itemErrors } = validateComboItems([
      { ...firstItem, categoryId: FAKE_CATEGORY_ID },
      { ...secondItem, categoryId: FAKE_CATEGORY_ID },
      { ...secondItem, categoryId: SECOND_CATEGORY_ID },
    ]);

    expect(itemErrors).toEqual([
      {},
      {
        categoryId:
          COMBO_FORM_COPY.CATEGORY_DUPLICATED_ERROR,
      },
      {},
    ]);
  });
});
