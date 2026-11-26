import { COMBO_AUDIENCE } from "@/app/features/administration/combo-catalog/constants/ComboAudience.constants";
import { COMBO_STATUS } from "@/app/features/administration/combo-catalog/constants/ComboStatus.constants";
import type { ComboSeedInput } from "../models/ComboSeedInput.interface";

export const E2E_COMBO_NAME_PREFIX = "e2e_combo_";

export const E2E_COMBO_SCENARIO = {
  FOREIGN_LISTED: "foreign_listed",
  INACTIVE: "inactive",
  NATIONAL_LISTED: "national_listed",
  REACTIVATE: "reactivate",
  REMOVE_SOLD: "remove_sold",
  REMOVE_UNSOLD: "remove_unsold",
} as const;

export const E2E_COMBO_SEED = {
  ITEM_QUANTITY: 2,
  PRICE_CRC: 85_000,
  PRICE_USD: 150,
} as const;

export const DEFAULT_COMBO_SEED_INPUT: ComboSeedInput = {
  audience: COMBO_AUDIENCE.NATIONAL,
  price: E2E_COMBO_SEED.PRICE_CRC,
  scenario: E2E_COMBO_SCENARIO.NATIONAL_LISTED,
  status: COMBO_STATUS.ACTIVE,
};

export const resolveComboFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_COMBO_NAME_PREFIX}${scenario}_${projectName}`;
