import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import type { Extra } from "../models/Extra.interface";
import type { ExtraDetail } from "../models/ExtraDetail.interface";
import type { ExtraRow } from "../models/ExtraRow.type";

export const FAKE_EXTRA_ID = "fake-extra-id";
export const FAKE_EXTRA_NAME = "Tubing";
export const FAKE_EXTRA_COMPATIBLE_UNIT_COUNT = 3;
export const FAKE_EXTRA_PRICE_USD = 25;
export const FAKE_EXTRA_PRICE_USD_TEXT = "25";
export const FAKE_EXTRA_PRICE_CRC = 15000.5;
export const FAKE_EXTRA_PRICE_CRC_TEXT = "15000.5";
export const FAKE_OCCUPIED_CATEGORY_ID =
  "7c1f5a52-2f1c-4d52-9a47-0d1a6f2a9b11";
export const FAKE_OCCUPIED_CATEGORY_NAME = "Tabla de wake";
export const FAKE_OCCUPIED_QUANTITY = 2;
export const FAKE_OCCUPIED_QUANTITY_TEXT = "2";
export const LONG_EXTRA_NAME_REPEATS = 100;
export const UNKNOWN_REMOVAL_OUTCOME = "archived";
export const UNSAFE_EXTRA_ID = "a/b c?d";
export const NON_USTED_WORDS_PATTERN =
  /\b(tienes|puedes|quieres|debes|tu|tus|te|ti|contigo|ingresa|intenta|selecciona|escribe|revisa|vuelve)\b/i;

export const DEFAULT_EXTRA: Extra = {
  id: FAKE_EXTRA_ID,
  name: FAKE_EXTRA_NAME,
  status: EXTRA_STATUS.ACTIVE,
  priceUsd: FAKE_EXTRA_PRICE_USD,
  priceCrc: null,
  occupiesCategoryId: null,
  occupiesQuantity: null,
  occupiedCategoryName: null,
  compatibleUnitCount: FAKE_EXTRA_COMPATIBLE_UNIT_COUNT,
};

export const OCCUPYING_EXTRA: Extra = {
  ...DEFAULT_EXTRA,
  occupiesCategoryId: FAKE_OCCUPIED_CATEGORY_ID,
  occupiesQuantity: FAKE_OCCUPIED_QUANTITY,
  occupiedCategoryName: FAKE_OCCUPIED_CATEGORY_NAME,
};

export const DEFAULT_EXTRA_DETAIL: ExtraDetail = {
  ...DEFAULT_EXTRA,
  isUsedInReservations: false,
};

export const DEFAULT_EXTRA_ROW: ExtraRow = {
  id: FAKE_EXTRA_ID,
  name: FAKE_EXTRA_NAME,
  status: EXTRA_STATUS.ACTIVE,
  price_usd: FAKE_EXTRA_PRICE_USD,
  price_crc: null,
  occupies_category_id: null,
  occupies_quantity: null,
  occupied_category: null,
  extra_compatibility: [
    { count: FAKE_EXTRA_COMPATIBLE_UNIT_COUNT },
  ],
};

export const OCCUPYING_EXTRA_ROW: ExtraRow = {
  ...DEFAULT_EXTRA_ROW,
  occupies_category_id: FAKE_OCCUPIED_CATEGORY_ID,
  occupies_quantity: FAKE_OCCUPIED_QUANTITY,
  occupied_category: { name: FAKE_OCCUPIED_CATEGORY_NAME },
};
