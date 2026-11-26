import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { formatTariffAmounts } from "../utils/formatTariffAmounts";
import {
  BOTH_AMOUNTS,
  FORMATTED_BOTH_AMOUNTS,
  FORMATTED_CRC,
  FORMATTED_USD,
  TOUR_AMOUNT_USD,
} from "./TariffCatalog.constants";

describe("formatTariffAmounts", () => {
  it("shows dollars first and colones second when both exist", () => {
    expect(formatTariffAmounts(BOTH_AMOUNTS)).toBe(
      FORMATTED_BOTH_AMOUNTS
    );
  });

  it("shows only the dollars when there are no colones", () => {
    expect(
      formatTariffAmounts({ ...BOTH_AMOUNTS, crc: null })
    ).toBe(FORMATTED_USD);
  });

  it("shows only the colones when there are no dollars", () => {
    expect(
      formatTariffAmounts({ ...BOTH_AMOUNTS, usd: null })
    ).toBe(FORMATTED_CRC);
  });

  it("formats a whole dollar amount", () => {
    expect(
      formatTariffAmounts({
        crc: null,
        usd: TOUR_AMOUNT_USD,
      })
    ).toBe(
      formatMoney({
        amount: TOUR_AMOUNT_USD,
        currency: CURRENCY_CODE.USD,
      })
    );
  });

  it("says there is no tariff when the tariff is missing", () => {
    expect(formatTariffAmounts(null)).toBe(
      TARIFF_CATALOG_COPY.NO_TARIFF
    );
  });

  it("says there is no tariff when both amounts are empty", () => {
    expect(
      formatTariffAmounts({ crc: null, usd: null })
    ).toBe(TARIFF_CATALOG_COPY.NO_TARIFF);
  });
});
