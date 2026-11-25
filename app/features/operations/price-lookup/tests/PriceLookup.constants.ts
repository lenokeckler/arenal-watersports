import { PRICE_LOOKUP_AUDIENCE } from "../constants/PriceLookupAudience.constants";
import type { PriceLookupCombo } from "../models/PriceLookupCombo.interface";
import type { PriceLookupExtra } from "../models/PriceLookupExtra.interface";
import type { PriceLookupTariff } from "../models/PriceLookupTariff.interface";
import type { PriceLookupComboRow } from "../models/PriceLookupComboRow.type";
import type { PriceLookupExtraRow } from "../models/PriceLookupExtraRow.type";
import type { PriceLookupTariffRow } from "../models/PriceLookupTariffRow.type";

export const CATEGORIES_TABLE = "equipment_categories";
export const COMBOS_TABLE = "combos";
export const EXTRAS_TABLE = "extras";
export const STATUS_COLUMN = "status";
export const ACTIVE_STATUS = "active";
export const MONEY_TABLES = [
  "reservation_charges",
  "refunds",
  "deposits",
  "reservation_pricing",
] as const;

export const JET_SKI_RENTAL_CRC = 60_000;
export const JET_SKI_RENTAL_USD = 120;
export const JET_SKI_TOUR_USD = 80;
export const PARRILLA_CRC = 15_000;
export const PARRILLA_USD = 30;
export const TUBING_USD = 25;
export const NATIONAL_COMBO_CRC = 90_000;
export const FOREIGN_COMBO_USD = 180;
export const COMBO_BOAT_QUANTITY = 1;
export const COMBO_JET_SKI_QUANTITY = 2;

export const JET_SKI_TARIFF_ROW: PriceLookupTariffRow = {
  id: "category-jet-ski",
  name: "Jet ski",
  tariffs: [
    {
      amount_crc: JET_SKI_RENTAL_CRC,
      amount_usd: JET_SKI_RENTAL_USD,
      type: "rental",
    },
    {
      amount_crc: null,
      amount_usd: JET_SKI_TOUR_USD,
      type: "tour",
    },
  ],
};

export const BOAT_TARIFF_ROW: PriceLookupTariffRow = {
  id: "category-boat",
  name: "Lancha",
  tariffs: [],
};

export const PARRILLA_ROW: PriceLookupExtraRow = {
  id: "extra-parrilla",
  name: "Parrilla",
  price_crc: PARRILLA_CRC,
  price_usd: PARRILLA_USD,
};

export const TUBING_ROW: PriceLookupExtraRow = {
  id: "extra-tubing",
  name: "Tubing",
  price_crc: null,
  price_usd: TUBING_USD,
};

export const NATIONAL_COMBO_ROW: PriceLookupComboRow = {
  audience: PRICE_LOOKUP_AUDIENCE.NATIONAL,
  combo_items: [
    {
      equipment_categories: { name: "Lancha" },
      quantity: COMBO_BOAT_QUANTITY,
    },
    {
      equipment_categories: { name: "Jet ski" },
      quantity: COMBO_JET_SKI_QUANTITY,
    },
  ],
  id: "combo-national",
  name: "Combo familiar",
  package_price_crc: NATIONAL_COMBO_CRC,
  package_price_usd: null,
};

export const FOREIGN_COMBO_ROW: PriceLookupComboRow = {
  ...NATIONAL_COMBO_ROW,
  audience: PRICE_LOOKUP_AUDIENCE.FOREIGN,
  id: "combo-foreign",
  name: "Family combo",
  package_price_crc: null,
  package_price_usd: FOREIGN_COMBO_USD,
};

export const NATIONAL_COMBO: PriceLookupCombo = {
  audience: PRICE_LOOKUP_AUDIENCE.NATIONAL,
  id: NATIONAL_COMBO_ROW.id,
  items: [
    {
      categoryName: "Lancha",
      quantity: COMBO_BOAT_QUANTITY,
    },
    {
      categoryName: "Jet ski",
      quantity: COMBO_JET_SKI_QUANTITY,
    },
  ],
  name: NATIONAL_COMBO_ROW.name,
  packagePrice: NATIONAL_COMBO_CRC,
};

export const FOREIGN_COMBO: PriceLookupCombo = {
  ...NATIONAL_COMBO,
  audience: PRICE_LOOKUP_AUDIENCE.FOREIGN,
  id: FOREIGN_COMBO_ROW.id,
  name: FOREIGN_COMBO_ROW.name,
  packagePrice: FOREIGN_COMBO_USD,
};

export const PARRILLA_EXTRA: PriceLookupExtra = {
  amounts: { crc: PARRILLA_CRC, usd: PARRILLA_USD },
  id: PARRILLA_ROW.id,
  name: PARRILLA_ROW.name,
};

export const TUBING_EXTRA: PriceLookupExtra = {
  amounts: { crc: null, usd: TUBING_USD },
  id: TUBING_ROW.id,
  name: TUBING_ROW.name,
};

export const JET_SKI_TARIFF: PriceLookupTariff = {
  categoryId: JET_SKI_TARIFF_ROW.id,
  categoryName: JET_SKI_TARIFF_ROW.name,
  rental: {
    crc: JET_SKI_RENTAL_CRC,
    usd: JET_SKI_RENTAL_USD,
  },
  tour: { crc: null, usd: JET_SKI_TOUR_USD },
};

export const BOAT_TARIFF: PriceLookupTariff = {
  categoryId: BOAT_TARIFF_ROW.id,
  categoryName: BOAT_TARIFF_ROW.name,
  rental: null,
  tour: null,
};
