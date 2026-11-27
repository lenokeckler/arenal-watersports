import { COMBO_CATALOG_COPY } from "@/app/features/administration/combo-catalog/constants/ComboCatalogCopy.constants";

export const E2E_COMBO_FORM_SCENARIO = {
  BACK: "form_back",
  CREATE_FOREIGN: "form_create_foreign",
  CREATE_NATIONAL: "form_create_national",
  DUPLICATED_CATEGORY: "form_duplicated_category",
  EDIT_NEVER_SOLD: "form_edit_never_sold",
  EDIT_NEVER_SOLD_RENAMED: "form_edit_never_sold_renamed",
  EDIT_SOLD: "form_edit_sold",
  EDIT_SOLD_EQUIPMENT: "form_edit_sold_equipment",
  EDIT_SOLD_RENAMED: "form_edit_sold_renamed",
  NO_EQUIPMENT: "form_no_equipment",
  NO_PRICE: "form_no_price",
  ZERO_PRICE: "form_zero_price",
} as const;

export const E2E_COMBO_FORM_CATEGORY = {
  BOAT: "Lancha",
  JET_SKI: "Jet Ski",
} as const;

export const E2E_COMBO_FORM_ROW = {
  FIRST: 1,
  SECOND: 2,
} as const;

export const E2E_COMBO_FORM_QUANTITY = {
  CHANGED: 5,
  FIRST: 2,
  SECOND: 1,
} as const;

export const E2E_COMBO_FORM_PRICE = {
  CRC: 120_000,
  CRC_EDITED: 95_000,
  USD: 180,
  ZERO: 0,
} as const;

export const E2E_COMBO_FORM_ITEMS_SUMMARY = [
  `${E2E_COMBO_FORM_QUANTITY.FIRST.toString()} ${E2E_COMBO_FORM_CATEGORY.JET_SKI}`,
  `${E2E_COMBO_FORM_QUANTITY.SECOND.toString()} ${E2E_COMBO_FORM_CATEGORY.BOAT}`,
].join(COMBO_CATALOG_COPY.ITEM_SEPARATOR);
