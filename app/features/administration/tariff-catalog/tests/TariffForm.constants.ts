import { STRING } from "@/app/constants";
import { DEFAULT_TARIFF_FORM_VALUES } from "../constants/TariffFormDefaults.constants";
import type { SaveTariffsInput } from "../models/SaveTariffsInput.type";
import type { TariffFormValues } from "../models/TariffFormValues.interface";
import type { TariffTypeFormValues } from "../models/TariffTypeFormValues.interface";
import {
  buildCatalogRow,
  DEFAULT_CATALOG_ROW,
  FAKE_CATEGORY_ID,
  RENTAL_AMOUNT_CRC,
  RENTAL_AMOUNT_USD,
  TOUR_AMOUNT_USD,
} from "./TariffCatalog.constants";

export const RENTAL_USD_TEXT = "120.5";
export const RENTAL_CRC_TEXT = "60000";
export const TOUR_USD_TEXT = "80";
export const COMMA_USD_TEXT = "120,5";
export const WHITESPACE_TEXT = "   ";
export const NON_NUMERIC_PRICE_TEXT = "abc";
export const NON_POSITIVE_PRICE_TEXT = "0";
export const EXCESS_DECIMALS_PRICE_TEXT = "1.234";
export const EXCESS_DIGITS_PRICE_TEXT = "12345678901";

export const EXISTING_TARIFFS = DEFAULT_CATALOG_ROW;
export const NO_EXISTING_TARIFFS = buildCatalogRow({
  rental: null,
  tour: null,
});

export const buildTypeValues = (
  overrides: Partial<TariffTypeFormValues> = {}
): TariffTypeFormValues => ({
  crcText: STRING.Empty,
  usdText: STRING.Empty,
  ...overrides,
});

export const buildFormValues = (
  overrides: Partial<TariffFormValues> = {}
): TariffFormValues => ({
  ...DEFAULT_TARIFF_FORM_VALUES,
  ...overrides,
});

export const FILLED_FORM_VALUES = buildFormValues({
  rental: buildTypeValues({
    crcText: RENTAL_CRC_TEXT,
    usdText: RENTAL_USD_TEXT,
  }),
  tour: buildTypeValues({ usdText: TOUR_USD_TEXT }),
});

export const EXPECTED_SAVE_PAYLOAD: SaveTariffsInput = {
  category_id: FAKE_CATEGORY_ID,
  rental: {
    crc: RENTAL_AMOUNT_CRC,
    usd: RENTAL_AMOUNT_USD,
  },
  tour: { crc: null, usd: TOUR_AMOUNT_USD },
};
