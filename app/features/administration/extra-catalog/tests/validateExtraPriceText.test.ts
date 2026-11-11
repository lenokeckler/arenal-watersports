import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  STRING,
} from "@/app/constants";
import { EXTRA_PRICE_ERROR_COPY } from "../constants/ExtraPriceErrorCopy.constants";
import { validateExtraPriceText } from "../utils/validateExtraPriceText";
import { NON_STRING_EXTRA_PRICES } from "./ExtraActions.constants";
import {
  ACCEPTED_PRICE_TEXT_CASES,
  REJECTED_PRICE_TEXT_CASES,
} from "./ExtraPrice.constants";

describe("validateExtraPriceText", () => {
  it.each(ACCEPTED_PRICE_TEXT_CASES)(
    "accepts $text as a $currency price",
    ({ text, currency, expectedError }) => {
      expect(validateExtraPriceText(text, currency)).toBe(
        expectedError
      );
    }
  );

  it.each(REJECTED_PRICE_TEXT_CASES)(
    "rejects $text as a $currency price",
    ({ text, currency, expectedError }) => {
      expect(validateExtraPriceText(text, currency)).toBe(
        expectedError
      );
    }
  );

  it.each([STRING.Empty, "   ", null, undefined])(
    "accepts the blank value %j as no price",
    (priceText) => {
      expect(
        validateExtraPriceText(priceText, CURRENCY_CODE.USD)
      ).toBeUndefined();
    }
  );

  it.each(NON_STRING_EXTRA_PRICES)(
    "rejects the non-string value %j as a format error",
    (priceText) => {
      expect(
        validateExtraPriceText(priceText, CURRENCY_CODE.CRC)
      ).toBe(
        EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.CRC][
          MONEY_AMOUNT_ISSUE.FORMAT
        ]
      );
    }
  );
});
