import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import { COMBO_STATUS } from "../constants/ComboStatus.constants";
import type { Combo } from "../models/Combo.interface";

export const FAKE_COMBO_ID = "combo-family";
export const SECOND_COMBO_ID = "combo-tourist";
export const SECOND_COMBO_NAME = "Combo turista";
export const UNKNOWN_REMOVAL_OUTCOME = "archived";
export const FAKE_CATEGORY_NAME = "Lancha";
export const SECOND_CATEGORY_NAME = "Jet ski";
export const FAKE_QUANTITY = 2;
export const SECOND_QUANTITY = 1;
export const NATIONAL_PRICE = 50_000;
export const FOREIGN_PRICE = 120.5;

export const EXPECTED_ITEMS_SUMMARY = [
  `${FAKE_QUANTITY} ${FAKE_CATEGORY_NAME}`,
  `${SECOND_QUANTITY} ${SECOND_CATEGORY_NAME}`,
].join(COMBO_CATALOG_COPY.ITEM_SEPARATOR);

export const DEFAULT_COMBO: Combo = {
  audience: COMBO_AUDIENCE.NATIONAL,
  id: FAKE_COMBO_ID,
  items: [
    {
      categoryName: FAKE_CATEGORY_NAME,
      quantity: FAKE_QUANTITY,
    },
    {
      categoryName: SECOND_CATEGORY_NAME,
      quantity: SECOND_QUANTITY,
    },
  ],
  name: "Combo familiar",
  packagePrice: NATIONAL_PRICE,
  status: COMBO_STATUS.ACTIVE,
};

export const buildCombo = (
  overrides: Partial<Combo> = {}
): Combo => ({ ...DEFAULT_COMBO, ...overrides });
