import type { TariffAmounts } from "@/app/features/administration/tariff-catalog/models/TariffAmounts.interface";
import type { TariffSeedInput } from "../models/TariffSeedInput.interface";

export const E2E_TARIFF_NAME_PREFIX = "e2e_tariff_";

export const E2E_TARIFF_SCENARIO = {
  BACK: "back",
  CHANGE_HINT: "change_hint",
  EDIT_EXISTING: "edit_existing",
  EDIT_LINK: "edit_link",
  INVALID_TEXT: "invalid_text",
  LIST_BOTH_AMOUNTS: "list_both_amounts",
  LIST_NO_TARIFF: "list_no_tariff",
  LIST_ONE_TYPE: "list_one_type",
  MISSING_PRICE: "missing_price",
  SAVE_RENTAL: "save_rental",
  SAVE_TOUR_CRC: "save_tour_crc",
  ZERO_PRICE: "zero_price",
} as const;

export const E2E_TARIFF_TYPE_COUNT = 2;

export const E2E_TARIFF_AMOUNTS = {
  EDITED_RENTAL: { crc: 5_000, usd: 12 },
  EXISTING_RENTAL: { crc: 5_000, usd: 10 },
  LISTED_RENTAL: { crc: 12_500, usd: 25 },
  LISTED_TOUR: { crc: 40_000, usd: null },
} as const satisfies Record<string, TariffAmounts>;

export const E2E_TARIFF_INPUT = {
  INVALID_TEXT: "abc",
  ZERO: "0",
} as const;

export const DEFAULT_TARIFF_SEED_INPUT: TariffSeedInput = {
  rental: null,
  scenario: E2E_TARIFF_SCENARIO.LIST_NO_TARIFF,
  tour: null,
};

export const resolveTariffFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_TARIFF_NAME_PREFIX}${scenario}_${projectName}`;
