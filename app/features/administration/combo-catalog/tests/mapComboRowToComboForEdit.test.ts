import { describe, expect, it } from "vitest";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import type { ComboForEditRow } from "../models/ComboForEditRow.type";
import { mapComboRowToComboForEdit } from "../utils/mapComboRowToComboForEdit";
import {
  FAKE_COMBO_ID,
  FOREIGN_PRICE,
  NATIONAL_PRICE,
} from "./Combo.constants";
import {
  DEFAULT_COMBO_FOR_EDIT,
  FAKE_CATEGORY_ID,
  FAKE_COMBO_NAME,
  FIRST_ITEM_QUANTITY,
} from "./ComboForm.constants";

const buildRow = (
  overrides: Partial<ComboForEditRow> = {}
): ComboForEditRow => ({
  audience: COMBO_AUDIENCE.FOREIGN,
  combo_items: [
    {
      category_id: FAKE_CATEGORY_ID,
      quantity: FIRST_ITEM_QUANTITY,
    },
  ],
  id: FAKE_COMBO_ID,
  name: FAKE_COMBO_NAME,
  package_price_crc: null,
  package_price_usd: FOREIGN_PRICE,
  ...overrides,
});

describe("mapComboRowToComboForEdit", () => {
  it("maps the row with the dollar price of a foreign combo", () => {
    expect(mapComboRowToComboForEdit(buildRow())).toEqual(
      DEFAULT_COMBO_FOR_EDIT
    );
  });

  it("reads the colon price of a national combo", () => {
    const combo = mapComboRowToComboForEdit(
      buildRow({
        audience: COMBO_AUDIENCE.NATIONAL,
        package_price_crc: NATIONAL_PRICE,
        package_price_usd: null,
      })
    );

    expect(combo.packagePrice).toBe(NATIONAL_PRICE);
  });

  it("keeps a missing price as null", () => {
    expect(
      mapComboRowToComboForEdit(
        buildRow({ package_price_usd: null })
      ).packagePrice
    ).toBeNull();
  });
});
