import { describe, expect, it } from "vitest";
import { mapPriceLookupComboRow } from "../utils/mapPriceLookupComboRow";
import { mapPriceLookupExtraRow } from "../utils/mapPriceLookupExtraRow";
import { mapPriceLookupTariffRow } from "../utils/mapPriceLookupTariffRow";
import {
  BOAT_TARIFF,
  BOAT_TARIFF_ROW,
  FOREIGN_COMBO_ROW,
  FOREIGN_COMBO_USD,
  JET_SKI_TARIFF,
  JET_SKI_TARIFF_ROW,
  NATIONAL_COMBO,
  NATIONAL_COMBO_CRC,
  NATIONAL_COMBO_ROW,
  PARRILLA_EXTRA,
  PARRILLA_ROW,
  TUBING_EXTRA,
  TUBING_ROW,
} from "./PriceLookup.constants";

describe("mapPriceLookupTariffRow", () => {
  it("keeps each currency of the rental and of the tour apart", () => {
    expect(
      mapPriceLookupTariffRow(JET_SKI_TARIFF_ROW)
    ).toEqual(JET_SKI_TARIFF);
  });

  it("leaves a type without a tariff as null", () => {
    expect(
      mapPriceLookupTariffRow(BOAT_TARIFF_ROW)
    ).toEqual(BOAT_TARIFF);
  });
});

describe("mapPriceLookupExtraRow", () => {
  it("keeps the colones and the dollars of the extra apart", () => {
    expect(mapPriceLookupExtraRow(PARRILLA_ROW)).toEqual(
      PARRILLA_EXTRA
    );
    expect(mapPriceLookupExtraRow(TUBING_ROW)).toEqual(
      TUBING_EXTRA
    );
  });
});

describe("mapPriceLookupComboRow", () => {
  it("prices a national combo in colones", () => {
    const combo = mapPriceLookupComboRow(
      NATIONAL_COMBO_ROW
    );

    expect(combo).toEqual(NATIONAL_COMBO);
    expect(combo.packagePrice).toBe(NATIONAL_COMBO_CRC);
  });

  it("prices a foreign combo in dollars", () => {
    const combo = mapPriceLookupComboRow(FOREIGN_COMBO_ROW);

    expect(combo.audience).toBe(FOREIGN_COMBO_ROW.audience);
    expect(combo.packagePrice).toBe(FOREIGN_COMBO_USD);
  });
});
