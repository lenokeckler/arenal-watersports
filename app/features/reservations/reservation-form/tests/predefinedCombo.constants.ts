import type { PredefinedComboQueryRecords } from "../models/PredefinedComboQueryRecords.interface";
import { HTTP_STATUS } from "@/app/constants";
import {
  PREDEFINED_COMBO_AUDIENCE,
  PREDEFINED_COMBO_STATUS,
} from "../constants/PredefinedCombo.constants";

export const PREDEFINED_COMBO_TEST_IDS = {
  CATEGORY: "category-jet-ski",
  COMBO: "combo-adventure",
  FOREIGN_COMBO: "combo-foreign",
  INACTIVE_CATEGORY: "category-inactive",
  INACTIVE_COMBO: "combo-inactive",
  INVALID_CATEGORY_COMBO: "combo-invalid-category",
  INVALID_PRICE_COMBO: "combo-invalid-price",
  EMPTY_COMBO: "combo-empty",
  INVALID_QUANTITY_COMBO: "combo-invalid-quantity",
  NON_RESERVABLE_CATEGORY: "category-non-reservable",
  NON_RESERVABLE_COMBO: "combo-non-reservable",
  ZERO_PRICE_COMBO: "combo-zero-price",
  NEGATIVE_PRICE_COMBO: "combo-negative-price",
} as const;

export const PREDEFINED_COMBO_HTTP_STATUS = {
  SERVER_ERROR: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  SUCCESS: HTTP_STATUS.OK,
} as const;

export const DEFAULT_PREDEFINED_COMBO_RECORDS: PredefinedComboQueryRecords =
  {
    categories: [
      {
        id: PREDEFINED_COMBO_TEST_IDS.CATEGORY,
        is_reservable: true,
        name: "Jet Ski",
        status: PREDEFINED_COMBO_STATUS.ACTIVE,
      },
    ],
    comboItems: [
      {
        category_id: PREDEFINED_COMBO_TEST_IDS.CATEGORY,
        combo_id: PREDEFINED_COMBO_TEST_IDS.COMBO,
        quantity: 2,
      },
      {
        category_id: PREDEFINED_COMBO_TEST_IDS.CATEGORY,
        combo_id: PREDEFINED_COMBO_TEST_IDS.FOREIGN_COMBO,
        quantity: 1,
      },
    ],
    combos: [
      {
        audience: PREDEFINED_COMBO_AUDIENCE.NATIONAL,
        id: PREDEFINED_COMBO_TEST_IDS.COMBO,
        name: "Adventure",
        package_price_crc: 25000,
        package_price_usd: null,
        status: PREDEFINED_COMBO_STATUS.ACTIVE,
      },
      {
        audience: PREDEFINED_COMBO_AUDIENCE.FOREIGN,
        id: PREDEFINED_COMBO_TEST_IDS.FOREIGN_COMBO,
        name: "Foreign Adventure",
        package_price_crc: null,
        package_price_usd: 75,
        status: PREDEFINED_COMBO_STATUS.ACTIVE,
      },
    ],
  };
