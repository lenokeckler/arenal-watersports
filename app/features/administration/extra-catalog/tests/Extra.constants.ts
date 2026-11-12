import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import type { Extra } from "../models/Extra.interface";
import type { ExtraRow } from "../models/ExtraRow.type";

export const FAKE_EXTRA_ID = "fake-extra-id";
export const FAKE_EXTRA_NAME = "Tubing";
export const FAKE_EXTRA_PRICE_USD = 25;
export const FAKE_EXTRA_PRICE_USD_TEXT = "25";
export const FAKE_EXTRA_PRICE_CRC = 15000.5;
export const FAKE_EXTRA_PRICE_CRC_TEXT = "15000.5";
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
};

export const DEFAULT_EXTRA_ROW: ExtraRow = {
  id: FAKE_EXTRA_ID,
  name: FAKE_EXTRA_NAME,
  status: EXTRA_STATUS.ACTIVE,
  price_usd: FAKE_EXTRA_PRICE_USD,
  price_crc: null,
};
