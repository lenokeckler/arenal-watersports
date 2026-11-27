import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  STRING,
} from "@/app/constants";
import { TARIFF_PRICE_ERROR_COPY } from "../constants/TariffPriceErrorCopy.constants";
import { validateTariffPriceText } from "../utils/validateTariffPriceText";
import {
  EXCESS_DECIMALS_PRICE_TEXT,
  NON_NUMERIC_PRICE_TEXT,
  NON_POSITIVE_PRICE_TEXT,
  RENTAL_USD_TEXT,
  WHITESPACE_TEXT,
} from "./TariffForm.constants";

describe("validateTariffPriceText", () => {
  it.each([STRING.Empty, WHITESPACE_TEXT, RENTAL_USD_TEXT])(
    "accepts %j",
    (priceText) => {
      expect(
        validateTariffPriceText(
          priceText,
          CURRENCY_CODE.USD
        )
      ).toBeUndefined();
    }
  );

  it.each([
    [
      NON_NUMERIC_PRICE_TEXT,
      CURRENCY_CODE.USD,
      TARIFF_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
        MONEY_AMOUNT_ISSUE.FORMAT
      ],
    ],
    [
      NON_POSITIVE_PRICE_TEXT,
      CURRENCY_CODE.CRC,
      TARIFF_PRICE_ERROR_COPY[CURRENCY_CODE.CRC][
        MONEY_AMOUNT_ISSUE.NOT_POSITIVE
      ],
    ],
    [
      EXCESS_DECIMALS_PRICE_TEXT,
      CURRENCY_CODE.CRC,
      TARIFF_PRICE_ERROR_COPY[CURRENCY_CODE.CRC][
        MONEY_AMOUNT_ISSUE.PRECISION
      ],
    ],
  ])(
    "reports the issue of %j in the currency message",
    (priceText, currency, message) => {
      expect(
        validateTariffPriceText(priceText, currency)
      ).toBe(message);
    }
  );
});
