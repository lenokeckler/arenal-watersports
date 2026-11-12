import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { validateExtraPrices } from "../utils/validateExtraPrices";
import { INVALID_PRICE_INPUT_CASES } from "./ExtraActions.constants";
import { VALID_EXTRA_FORM_VALUES } from "./ExtraForm.constants";

describe("validateExtraPrices", () => {
  it("accepts a form with only the dollar price", () => {
    expect(
      validateExtraPrices(VALID_EXTRA_FORM_VALUES)
    ).toStrictEqual({});
  });

  it("accepts a form with only the colon price", () => {
    expect(
      validateExtraPrices({
        ...VALID_EXTRA_FORM_VALUES,
        priceUsd: STRING.Empty,
        priceCrc: "15000",
      })
    ).toStrictEqual({});
  });

  it("accepts a form with both prices", () => {
    expect(
      validateExtraPrices({
        ...VALID_EXTRA_FORM_VALUES,
        priceCrc: "15000,50",
      })
    ).toStrictEqual({});
  });

  it.each(INVALID_PRICE_INPUT_CASES)(
    "reports the errors when $description",
    ({ values, expectedErrors }) => {
      expect(
        validateExtraPrices({
          ...VALID_EXTRA_FORM_VALUES,
          ...values,
        })
      ).toStrictEqual(expectedErrors);
    }
  );

  it.each([null, undefined, 42, "text", {}])(
    "requires a price when the whole input is %j",
    (input) => {
      expect(validateExtraPrices(input)).toStrictEqual({
        prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
      });
    }
  );

  it("does not ask for a price when a present price is invalid", () => {
    const errors = validateExtraPrices({
      priceUsd: "abc",
      priceCrc: STRING.Empty,
    });

    expect(errors.prices).toBeUndefined();
    expect(errors.priceUsd).toBeDefined();
  });
});
