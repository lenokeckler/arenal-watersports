import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
} from "@/app/constants";
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";
import { NO_TARIFF_FORM_ERRORS } from "../constants/TariffFormDefaults.constants";
import { TARIFF_PRICE_ERROR_COPY } from "../constants/TariffPriceErrorCopy.constants";
import { validateTariffFormValues } from "../utils/validateTariffFormValues";
import {
  buildFormValues,
  buildTypeValues,
  EXCESS_DECIMALS_PRICE_TEXT,
  EXISTING_TARIFFS,
  FILLED_FORM_VALUES,
  NON_NUMERIC_PRICE_TEXT,
  NON_POSITIVE_PRICE_TEXT,
  NO_EXISTING_TARIFFS,
  TOUR_USD_TEXT,
} from "./TariffForm.constants";

describe("validateTariffFormValues", () => {
  it("accepts a form with every type priced", () => {
    expect(
      validateTariffFormValues(
        FILLED_FORM_VALUES,
        EXISTING_TARIFFS
      )
    ).toEqual(NO_TARIFF_FORM_ERRORS);
  });

  it("lets a type without a tariff stay blank", () => {
    const errors = validateTariffFormValues(
      buildFormValues({
        rental: buildTypeValues({ usdText: TOUR_USD_TEXT }),
      }),
      NO_EXISTING_TARIFFS
    );

    expect(errors).toEqual(NO_TARIFF_FORM_ERRORS);
  });

  it("refuses to empty a type that already has a tariff", () => {
    const errors = validateTariffFormValues(
      buildFormValues({
        rental: FILLED_FORM_VALUES.rental,
      }),
      EXISTING_TARIFFS
    );

    expect(errors.tour.required).toBe(
      TARIFF_FORM_COPY.TYPE_PRICE_REQUIRED_ERROR
    );
    expect(errors.rental).toEqual({});
    expect(errors.count).toBe(1);
  });

  it("asks for a price when nothing is written", () => {
    const errors = validateTariffFormValues(
      buildFormValues(),
      NO_EXISTING_TARIFFS
    );

    expect(errors.form).toBe(
      TARIFF_FORM_COPY.NO_PRICE_ERROR
    );
    expect(errors.count).toBe(1);
  });

  it("reports each invalid currency with its own message", () => {
    const errors = validateTariffFormValues(
      buildFormValues({
        rental: buildTypeValues({
          crcText: NON_POSITIVE_PRICE_TEXT,
          usdText: EXCESS_DECIMALS_PRICE_TEXT,
        }),
        tour: FILLED_FORM_VALUES.tour,
      }),
      NO_EXISTING_TARIFFS
    );

    expect(errors.rental).toEqual({
      crc: TARIFF_PRICE_ERROR_COPY[CURRENCY_CODE.CRC][
        MONEY_AMOUNT_ISSUE.NOT_POSITIVE
      ],
      usd: TARIFF_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
        MONEY_AMOUNT_ISSUE.PRECISION
      ],
    });
  });

  it("counts every invalid field", () => {
    const errors = validateTariffFormValues(
      buildFormValues({
        rental: buildTypeValues({
          crcText: NON_NUMERIC_PRICE_TEXT,
          usdText: NON_NUMERIC_PRICE_TEXT,
        }),
        tour: buildTypeValues({
          usdText: NON_NUMERIC_PRICE_TEXT,
        }),
      }),
      NO_EXISTING_TARIFFS
    );

    expect(errors.count).toBe(3);
    expect(errors.form).toBeUndefined();
  });
});
