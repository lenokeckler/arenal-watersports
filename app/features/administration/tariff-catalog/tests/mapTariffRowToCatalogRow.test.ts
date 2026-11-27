import { describe, expect, it } from "vitest";
import { mapTariffRowToCatalogRow } from "../utils/mapTariffRowToCatalogRow";
import {
  BOTH_AMOUNTS,
  buildTariffRow,
  FAKE_CATEGORY_ID,
  FAKE_CATEGORY_NAME,
  RENTAL_TARIFF_ROW,
  TOUR_AMOUNT_USD,
  TOUR_TARIFF_ROW,
  UNKNOWN_TARIFF_TYPE,
} from "./TariffCatalog.constants";

describe("mapTariffRowToCatalogRow", () => {
  it("keeps the category id and name", () => {
    const row = mapTariffRowToCatalogRow(buildTariffRow());

    expect(row.categoryId).toBe(FAKE_CATEGORY_ID);
    expect(row.categoryName).toBe(FAKE_CATEGORY_NAME);
  });

  it("splits the rental and tour amounts", () => {
    const row = mapTariffRowToCatalogRow(buildTariffRow());

    expect(row.rental).toEqual(BOTH_AMOUNTS);
    expect(row.tour).toEqual({
      crc: null,
      usd: TOUR_AMOUNT_USD,
    });
  });

  it("leaves both types empty for a category without tariffs", () => {
    const row = mapTariffRowToCatalogRow(
      buildTariffRow({ tariffs: [] })
    );

    expect(row.rental).toBeNull();
    expect(row.tour).toBeNull();
  });

  it("leaves the type without a tariff empty", () => {
    const row = mapTariffRowToCatalogRow(
      buildTariffRow({ tariffs: [RENTAL_TARIFF_ROW] })
    );

    expect(row.rental).toEqual(BOTH_AMOUNTS);
    expect(row.tour).toBeNull();
  });

  it("ignores a tariff of an unknown type", () => {
    const row = mapTariffRowToCatalogRow(
      buildTariffRow({
        tariffs: [
          { ...TOUR_TARIFF_ROW, type: UNKNOWN_TARIFF_TYPE },
        ],
      })
    );

    expect(row.rental).toBeNull();
    expect(row.tour).toBeNull();
  });

  it("keeps null amounts as null", () => {
    const row = mapTariffRowToCatalogRow(
      buildTariffRow({
        tariffs: [
          {
            ...RENTAL_TARIFF_ROW,
            amount_crc: null,
            amount_usd: null,
          },
        ],
      })
    );

    expect(row.rental).toEqual({ crc: null, usd: null });
  });
});
