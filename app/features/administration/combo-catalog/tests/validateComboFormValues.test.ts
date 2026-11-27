import { describe, expect, it } from "vitest";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { COMBO_PRICE_ERROR_COPY } from "../constants/ComboPriceErrorCopy.constants";
import { DEFAULT_COMBO_FORM_VALUES } from "../constants/ComboFormDefaults.constants";
import type { ComboAudience } from "../models/ComboAudience.type";
import { validateComboFormValues } from "../utils/validateComboFormValues";
import {
  BLANK_TEXTS,
  buildComboFormValues,
  CURRENCY_NAME_BY_AUDIENCE,
  VALID_COMBO_FORM_VALUES,
} from "./ComboForm.constants";

const [blankText] = BLANK_TEXTS;

describe("validateComboFormValues", () => {
  it("reports no errors for a complete national combo", () => {
    expect(
      validateComboFormValues(VALID_COMBO_FORM_VALUES)
    ).toMatchObject({ count: 0 });
  });

  it("reports no errors for a complete foreign combo", () => {
    const errors = validateComboFormValues(
      buildComboFormValues({
        audience: COMBO_AUDIENCE.FOREIGN,
      })
    );

    expect(errors.count).toBe(0);
  });

  it("reports every required field of an empty form", () => {
    const errors = validateComboFormValues(
      DEFAULT_COMBO_FORM_VALUES
    );

    expect(errors).toEqual({
      count: 3,
      itemErrors: [],
      items: COMBO_FORM_COPY.ITEMS_REQUIRED_ERROR,
      name: COMBO_FORM_COPY.NAME_REQUIRED_ERROR,
      price:
        COMBO_PRICE_ERROR_COPY[COMBO_AUDIENCE.NATIONAL]
          .required,
    });
  });

  it.each(Object.values(COMBO_AUDIENCE))(
    "names the currency of the %s audience in the price error",
    (audience: ComboAudience) => {
      const errors = validateComboFormValues(
        buildComboFormValues({
          audience,
          priceText: blankText,
        })
      );

      expect(errors.price).toContain(
        CURRENCY_NAME_BY_AUDIENCE[audience]
      );
    }
  );

  it("asks for an audience when it is not a known one", () => {
    const errors = validateComboFormValues(
      buildComboFormValues({
        audience: blankText as ComboAudience,
        priceText: blankText,
      })
    );

    expect(errors.audience).toBe(
      COMBO_FORM_COPY.AUDIENCE_REQUIRED_ERROR
    );
    expect(errors.price).toBeUndefined();
  });

  it("counts the errors of the item rows with the field errors", () => {
    const [firstItem] = VALID_COMBO_FORM_VALUES.items;
    const errors = validateComboFormValues(
      buildComboFormValues({
        items: [
          { ...firstItem, quantityText: blankText },
          { ...firstItem },
        ],
        name: blankText,
      })
    );

    expect(errors.count).toBe(3);
    expect(errors.itemErrors).toEqual([
      { quantity: COMBO_FORM_COPY.QUANTITY_INVALID_ERROR },
      {
        categoryId:
          COMBO_FORM_COPY.CATEGORY_DUPLICATED_ERROR,
      },
    ]);
  });
});
