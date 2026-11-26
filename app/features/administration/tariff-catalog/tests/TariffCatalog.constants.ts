import { CURRENCY_CODE } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { TARIFF_TYPE } from "../constants/TariffType.constants";
import type { TariffAmounts } from "../models/TariffAmounts.interface";
import type { TariffCatalogRow } from "../models/TariffCatalogRow.interface";
import type { TariffRow } from "../models/TariffRow.type";
import type { TariffRowTariff } from "../models/TariffRowTariff.type";

export const FAKE_CATEGORY_ID = "category-jet-ski";
export const FAKE_CATEGORY_NAME = "Jet ski";
export const SECOND_CATEGORY_ID = "category-boat";
export const SECOND_CATEGORY_NAME = "Lancha";
export const RENTAL_AMOUNT_USD = 120.5;
export const RENTAL_AMOUNT_CRC = 60_000;
export const TOUR_AMOUNT_USD = 80;
export const UNKNOWN_TARIFF_TYPE = "combo";
export const CATEGORIES_TABLE = "equipment_categories";
export const NAME_COLUMN = "name";
export const ID_COLUMN = "id";
export const STATUS_COLUMN = "status";

export const BOTH_AMOUNTS: TariffAmounts = {
  crc: RENTAL_AMOUNT_CRC,
  usd: RENTAL_AMOUNT_USD,
};

export const FORMATTED_USD = formatMoney({
  amount: RENTAL_AMOUNT_USD,
  currency: CURRENCY_CODE.USD,
});

export const FORMATTED_CRC = formatMoney({
  amount: RENTAL_AMOUNT_CRC,
  currency: CURRENCY_CODE.CRC,
});

export const FORMATTED_BOTH_AMOUNTS = [
  FORMATTED_USD,
  FORMATTED_CRC,
].join(TARIFF_CATALOG_COPY.AMOUNT_SEPARATOR);

export const RENTAL_TARIFF_ROW: TariffRowTariff = {
  amount_crc: RENTAL_AMOUNT_CRC,
  amount_usd: RENTAL_AMOUNT_USD,
  type: TARIFF_TYPE.RENTAL,
};

export const TOUR_TARIFF_ROW: TariffRowTariff = {
  amount_crc: null,
  amount_usd: TOUR_AMOUNT_USD,
  type: TARIFF_TYPE.TOUR,
};

export const buildTariffRow = (
  overrides: Partial<TariffRow> = {}
): TariffRow => ({
  id: FAKE_CATEGORY_ID,
  name: FAKE_CATEGORY_NAME,
  tariffs: [RENTAL_TARIFF_ROW, TOUR_TARIFF_ROW],
  ...overrides,
});

export const EMPTY_AMOUNTS: TariffAmounts = {
  crc: null,
  usd: null,
};

export const TOUR_ONLY_USD_AMOUNTS: TariffAmounts = {
  crc: null,
  usd: TOUR_AMOUNT_USD,
};

export const FORMATTED_TOUR_USD = formatMoney({
  amount: TOUR_AMOUNT_USD,
  currency: CURRENCY_CODE.USD,
});

export const DEFAULT_CATALOG_ROW: TariffCatalogRow = {
  categoryId: FAKE_CATEGORY_ID,
  categoryName: FAKE_CATEGORY_NAME,
  rental: BOTH_AMOUNTS,
  tour: TOUR_ONLY_USD_AMOUNTS,
};

export const buildCatalogRow = (
  overrides: Partial<TariffCatalogRow> = {}
): TariffCatalogRow => ({
  ...DEFAULT_CATALOG_ROW,
  ...overrides,
});
