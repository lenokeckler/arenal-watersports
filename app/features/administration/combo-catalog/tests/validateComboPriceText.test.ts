import { describe, expect, it } from "vitest";
import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import { COMBO_AUDIENCE_ORDER } from "../constants/ComboAudienceOrder.constants";
import { COMBO_PRICE_ERROR_COPY } from "../constants/ComboPriceErrorCopy.constants";
import { validateComboPriceText } from "../utils/validateComboPriceText";
import {
  BLANK_TEXTS,
  CURRENCY_NAME_BY_AUDIENCE,
  EXCESS_DECIMALS_PRICE_TEXT,
  FOREIGN_PRICE_COMMA_TEXT,
  NON_NUMERIC_PRICE_TEXTS,
  NON_POSITIVE_PRICE_TEXT,
} from "./ComboForm.constants";
import {
  FOREIGN_PRICE,
  NATIONAL_PRICE,
} from "./Combo.constants";

describe("validateComboPriceText", () => {
  describe.each(COMBO_AUDIENCE_ORDER)(
    "for %s",
    (audience) => {
      const errorCopy = COMBO_PRICE_ERROR_COPY[audience];

      it.each(BLANK_TEXTS)(
        "requires a price and names the currency for %j",
        (priceText) => {
          const error = validateComboPriceText(
            priceText,
            audience
          );

          expect(error).toBe(errorCopy.required);
          expect(error).toContain(
            CURRENCY_NAME_BY_AUDIENCE[audience]
          );
        }
      );

      it.each(NON_NUMERIC_PRICE_TEXTS)(
        "rejects %j as a malformed price",
        (priceText) => {
          expect(
            validateComboPriceText(priceText, audience)
          ).toBe(
            errorCopy.issues[MONEY_AMOUNT_ISSUE.FORMAT]
          );
        }
      );

      it("rejects a price of zero", () => {
        expect(
          validateComboPriceText(
            NON_POSITIVE_PRICE_TEXT,
            audience
          )
        ).toBe(
          errorCopy.issues[MONEY_AMOUNT_ISSUE.NOT_POSITIVE]
        );
      });

      it("rejects more decimals than the currency allows", () => {
        expect(
          validateComboPriceText(
            EXCESS_DECIMALS_PRICE_TEXT,
            audience
          )
        ).toBe(
          errorCopy.issues[MONEY_AMOUNT_ISSUE.PRECISION]
        );
      });

      it("accepts whole and decimal prices", () => {
        expect(
          validateComboPriceText(
            NATIONAL_PRICE.toString(),
            audience
          )
        ).toBeUndefined();
        expect(
          validateComboPriceText(
            FOREIGN_PRICE_COMMA_TEXT,
            audience
          )
        ).toBeUndefined();
        expect(
          validateComboPriceText(
            FOREIGN_PRICE.toString(),
            audience
          )
        ).toBeUndefined();
      });
    }
  );
});
