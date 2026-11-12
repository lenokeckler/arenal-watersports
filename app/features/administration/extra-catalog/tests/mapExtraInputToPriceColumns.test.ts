import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { mapExtraInputToPriceColumns } from "../utils/mapExtraInputToPriceColumns";
import {
  FAKE_EXTRA_PRICE_CRC,
  FAKE_EXTRA_PRICE_CRC_TEXT,
  FAKE_EXTRA_PRICE_USD,
} from "./Extra.constants";
import { VALID_EXTRA_FORM_VALUES } from "./ExtraForm.constants";

describe("mapExtraInputToPriceColumns", () => {
  it("parses a filled price to a number and an empty one to null", () => {
    expect(
      mapExtraInputToPriceColumns(VALID_EXTRA_FORM_VALUES)
    ).toStrictEqual({
      price_usd: FAKE_EXTRA_PRICE_USD,
      price_crc: null,
    });
  });

  it("parses both prices", () => {
    expect(
      mapExtraInputToPriceColumns({
        ...VALID_EXTRA_FORM_VALUES,
        priceCrc: FAKE_EXTRA_PRICE_CRC_TEXT,
      }).price_crc
    ).toBe(FAKE_EXTRA_PRICE_CRC);
  });

  it("sends null for a blank price", () => {
    expect(
      mapExtraInputToPriceColumns({
        ...VALID_EXTRA_FORM_VALUES,
        priceUsd: "   ",
        priceCrc: STRING.Empty,
      })
    ).toStrictEqual({ price_usd: null, price_crc: null });
  });
});
