import { describe, expect, it } from "vitest";
import { mapTariffFormValuesToPayload } from "../utils/mapTariffFormValuesToPayload";
import {
  COMMA_USD_TEXT,
  buildFormValues,
  buildTypeValues,
  EXPECTED_SAVE_PAYLOAD,
  FILLED_FORM_VALUES,
  WHITESPACE_TEXT,
} from "./TariffForm.constants";
import {
  FAKE_CATEGORY_ID,
  RENTAL_AMOUNT_USD,
} from "./TariffCatalog.constants";

describe("mapTariffFormValuesToPayload", () => {
  it("sends the prices as numbers and a blank currency as null", () => {
    expect(
      mapTariffFormValuesToPayload(
        FAKE_CATEGORY_ID,
        FILLED_FORM_VALUES
      )
    ).toEqual(EXPECTED_SAVE_PAYLOAD);
  });

  it("sends a blank type as null", () => {
    const payload = mapTariffFormValuesToPayload(
      FAKE_CATEGORY_ID,
      buildFormValues({
        rental: buildTypeValues({
          crcText: WHITESPACE_TEXT,
        }),
        tour: FILLED_FORM_VALUES.tour,
      })
    );

    expect(payload.rental).toBeNull();
    expect(payload.tour).toEqual(
      EXPECTED_SAVE_PAYLOAD.tour
    );
  });

  it("reads a comma decimal as a number", () => {
    const payload = mapTariffFormValuesToPayload(
      FAKE_CATEGORY_ID,
      buildFormValues({
        rental: buildTypeValues({
          usdText: COMMA_USD_TEXT,
        }),
      })
    );

    expect(payload.rental).toEqual({
      crc: null,
      usd: RENTAL_AMOUNT_USD,
    });
  });
});
