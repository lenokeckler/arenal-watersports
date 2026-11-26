import { describe, expect, it } from "vitest";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import { COMBO_STATUS } from "../constants/ComboStatus.constants";
import type { ComboRow } from "../models/ComboRow.type";
import { mapComboRowToCombo } from "../utils/mapComboRowToCombo";
import {
  FAKE_CATEGORY_NAME,
  FAKE_COMBO_ID,
  FAKE_QUANTITY,
  FOREIGN_PRICE,
  NATIONAL_PRICE,
} from "./Combo.constants";

const buildRow = (
  overrides: Partial<ComboRow> = {}
): ComboRow => ({
  audience: COMBO_AUDIENCE.NATIONAL,
  combo_items: [
    {
      equipment_categories: { name: FAKE_CATEGORY_NAME },
      quantity: FAKE_QUANTITY,
    },
  ],
  id: FAKE_COMBO_ID,
  name: FAKE_CATEGORY_NAME,
  package_price_crc: NATIONAL_PRICE,
  package_price_usd: null,
  status: COMBO_STATUS.ACTIVE,
  ...overrides,
});

describe("mapComboRowToCombo", () => {
  it("reads the colon price of a national combo", () => {
    expect(
      mapComboRowToCombo(buildRow()).packagePrice
    ).toBe(NATIONAL_PRICE);
  });

  it("reads the dollar price of a foreign combo", () => {
    const combo = mapComboRowToCombo(
      buildRow({
        audience: COMBO_AUDIENCE.FOREIGN,
        package_price_crc: null,
        package_price_usd: FOREIGN_PRICE,
      })
    );

    expect(combo.packagePrice).toBe(FOREIGN_PRICE);
  });

  it("maps the items with their category name and quantity", () => {
    expect(mapComboRowToCombo(buildRow()).items).toEqual([
      {
        categoryName: FAKE_CATEGORY_NAME,
        quantity: FAKE_QUANTITY,
      },
    ]);
  });

  it("keeps a missing price as null", () => {
    expect(
      mapComboRowToCombo(
        buildRow({ package_price_crc: null })
      ).packagePrice
    ).toBeNull();
  });
});
