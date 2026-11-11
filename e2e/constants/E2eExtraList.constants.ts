import { EXTRA_STATUS } from "@/app/features/administration/extra-catalog/constants/ExtraStatus.constants";
import type { ExtraSeedInput } from "../models/ExtraSeedInput.interface";

export const E2E_EXTRA_LIST_SCREENSHOT_BASENAME =
  "us-adm-19-extra-list";

export const E2E_EXTRA_REMOVAL_SCREENSHOT_BASENAME =
  "us-adm-19-extra-removal";

export const E2E_EXTRA_NAME_PREFIX = "e2e_";

export const E2E_EXTRA_SCENARIO = {
  INACTIVE: "inactive",
  LINKS: "links",
  REACTIVATE: "reactivate",
  REMOVE_UNUSED: "remove_unused",
  REMOVE_USED: "remove_used",
  SCREENSHOT_REMOVAL: "screenshot_removal",
  SCREENSHOT_ACTIVE: "screenshot_active",
  SCREENSHOT_INACTIVE: "screenshot_inactive",
  STATUS_ACTIVE: "status_active",
} as const;

export const E2E_EXTRA_SEED_PRICE = {
  CRC: 10_000,
  USD: 20,
} as const;

export const DEFAULT_EXTRA_SEED_INPUT: ExtraSeedInput = {
  scenario: E2E_EXTRA_SCENARIO.STATUS_ACTIVE,
  status: EXTRA_STATUS.ACTIVE,
  priceUsd: E2E_EXTRA_SEED_PRICE.USD,
  priceCrc: null,
};

export const resolveExtraFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_EXTRA_NAME_PREFIX}${scenario}_${projectName}`;
