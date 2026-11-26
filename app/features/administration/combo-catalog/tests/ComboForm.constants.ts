import {
  CURRENCY_NAME_COPY,
  STRING,
} from "@/app/constants";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import { COMBO_AUDIENCE_CURRENCY } from "../constants/ComboAudienceCurrency.constants";
import type { ComboForEdit } from "../models/ComboForEdit.interface";
import type { ComboFormValues } from "../models/ComboFormValues.interface";
import type { SaveComboInput } from "../models/SaveComboInput.type";
import {
  FAKE_COMBO_ID,
  FOREIGN_PRICE,
  NATIONAL_PRICE,
} from "./Combo.constants";

export const FAKE_CATEGORY_ID = "category-boat";
export const SECOND_CATEGORY_ID = "category-jet-ski";
export const FAKE_COMBO_NAME = "Combo familiar";
export const PADDED_COMBO_NAME = `  ${FAKE_COMBO_NAME}  `;
export const FIRST_ITEM_QUANTITY = 2;
export const SECOND_ITEM_QUANTITY = 1;
export const FOREIGN_PRICE_COMMA_TEXT = "120,5";
export const SAVED_COMBO_ID = "combo-saved";
export const SERVER_ERROR_MESSAGE = "boom";
export const COMBOS_TABLE = "combos";
export const CATEGORIES_TABLE = "equipment_categories";
export const COMBO_ID_COLUMN = "id";
export const STATUS_COLUMN = "status";
export const NAME_COLUMN = "name";

export const BLANK_TEXTS = [STRING.Empty, "   "];
export const NON_NUMERIC_PRICE_TEXTS = [
  "abc",
  "-5",
  "1 000",
  "1.2.3",
];
export const NON_POSITIVE_PRICE_TEXT = "0";
export const EXCESS_DECIMALS_PRICE_TEXT = "1.234";
export const INVALID_QUANTITY_TEXTS = [
  STRING.Empty,
  "0",
  "-1",
  "1.5",
  "abc",
];

export const CURRENCY_NAME_BY_AUDIENCE = {
  [COMBO_AUDIENCE.FOREIGN]:
    CURRENCY_NAME_COPY[
      COMBO_AUDIENCE_CURRENCY[COMBO_AUDIENCE.FOREIGN]
    ].toLowerCase(),
  [COMBO_AUDIENCE.NATIONAL]:
    CURRENCY_NAME_COPY[
      COMBO_AUDIENCE_CURRENCY[COMBO_AUDIENCE.NATIONAL]
    ].toLowerCase(),
};

export const VALID_COMBO_FORM_VALUES: ComboFormValues = {
  audience: COMBO_AUDIENCE.NATIONAL,
  items: [
    {
      categoryId: FAKE_CATEGORY_ID,
      quantityText: FIRST_ITEM_QUANTITY.toString(),
    },
    {
      categoryId: SECOND_CATEGORY_ID,
      quantityText: SECOND_ITEM_QUANTITY.toString(),
    },
  ],
  name: FAKE_COMBO_NAME,
  priceText: NATIONAL_PRICE.toString(),
};

export const buildComboFormValues = (
  overrides: Partial<ComboFormValues> = {}
): ComboFormValues => ({
  ...VALID_COMBO_FORM_VALUES,
  ...overrides,
});

export const EXPECTED_SAVE_PAYLOAD: SaveComboInput = {
  audience: COMBO_AUDIENCE.NATIONAL,
  items: [
    {
      category_id: FAKE_CATEGORY_ID,
      quantity: FIRST_ITEM_QUANTITY,
    },
    {
      category_id: SECOND_CATEGORY_ID,
      quantity: SECOND_ITEM_QUANTITY,
    },
  ],
  name: FAKE_COMBO_NAME,
  package_price: NATIONAL_PRICE,
};

export const DEFAULT_COMBO_FOR_EDIT: ComboForEdit = {
  audience: COMBO_AUDIENCE.FOREIGN,
  id: FAKE_COMBO_ID,
  items: [
    {
      categoryId: FAKE_CATEGORY_ID,
      quantity: FIRST_ITEM_QUANTITY,
    },
  ],
  name: FAKE_COMBO_NAME,
  packagePrice: FOREIGN_PRICE,
};
