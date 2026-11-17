import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { mapExtraToFormValues } from "../utils/mapExtraToFormValues";
import {
  DEFAULT_EXTRA,
  FAKE_EXTRA_NAME,
  FAKE_EXTRA_PRICE_CRC,
  FAKE_EXTRA_PRICE_CRC_TEXT,
  FAKE_EXTRA_PRICE_USD_TEXT,
  FAKE_OCCUPIED_CATEGORY_ID,
  FAKE_OCCUPIED_QUANTITY_TEXT,
  OCCUPYING_EXTRA,
} from "./Extra.constants";
import { buildExtra } from "./ExtraList.constants";

describe("mapExtraToFormValues", () => {
  it("preloads the name and the current prices as text, a missing price empty", () => {
    expect(
      mapExtraToFormValues(DEFAULT_EXTRA)
    ).toStrictEqual({
      name: FAKE_EXTRA_NAME,
      priceUsd: FAKE_EXTRA_PRICE_USD_TEXT,
      priceCrc: STRING.Empty,
      occupiesCategoryId: STRING.Empty,
      occupiesQuantity: STRING.Empty,
    });
  });

  it("preloads the occupied category and the quantity as text", () => {
    expect(mapExtraToFormValues(OCCUPYING_EXTRA)).toEqual(
      expect.objectContaining({
        occupiesCategoryId: FAKE_OCCUPIED_CATEGORY_ID,
        occupiesQuantity: FAKE_OCCUPIED_QUANTITY_TEXT,
      })
    );
  });

  it("preloads both prices", () => {
    expect(
      mapExtraToFormValues(
        buildExtra({ priceCrc: FAKE_EXTRA_PRICE_CRC })
      ).priceCrc
    ).toBe(FAKE_EXTRA_PRICE_CRC_TEXT);
  });
});
