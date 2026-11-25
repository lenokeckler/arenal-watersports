import { randomUUID } from "node:crypto";
import { PRICE_LOOKUP_AUDIENCE } from "@/app/features/operations/price-lookup/constants/PriceLookupAudience.constants";
import {
  E2E_PRICE_LOOKUP_AMOUNT,
  E2E_PRICE_LOOKUP_SCENARIO,
  E2E_PRICE_LOOKUP_EXTRA_OCCUPANCY,
  E2E_PRICE_LOOKUP_STATUS,
  E2E_PRICE_LOOKUP_TOKEN_LENGTH,
  resolvePriceLookupName,
} from "../constants/E2ePriceLookup.constants";
import type { PriceLookupFixture } from "../models/PriceLookupFixture.interface";
import type { PriceLookupLedger } from "../models/PriceLookupLedger.interface";
import type { PriceLookupNames } from "../models/PriceLookupNames.interface";
import { insertExtra } from "./extraFixtures";
import { insertPriceLookupCategory } from "./insertPriceLookupCategory";
import { insertPriceLookupCombo } from "./insertPriceLookupCombo";
import { removePriceLookupRecords } from "./removePriceLookupRecords";

const buildNames = (
  projectName: string
): PriceLookupNames => {
  const token = randomUUID().slice(
    0,
    E2E_PRICE_LOOKUP_TOKEN_LENGTH
  );
  const resolve = (scenario: string): string =>
    resolvePriceLookupName(scenario, projectName, token);

  return {
    activeCategory: resolve(
      E2E_PRICE_LOOKUP_SCENARIO.ACTIVE_CATEGORY
    ),
    activeExtra: resolve(
      E2E_PRICE_LOOKUP_SCENARIO.ACTIVE_EXTRA
    ),
    foreignCombo: resolve(
      E2E_PRICE_LOOKUP_SCENARIO.FOREIGN_COMBO
    ),
    foreignOnlyExtra: resolve(
      E2E_PRICE_LOOKUP_SCENARIO.FOREIGN_ONLY_EXTRA
    ),
    inactiveCategory: resolve(
      E2E_PRICE_LOOKUP_SCENARIO.INACTIVE_CATEGORY
    ),
    inactiveCombo: resolve(
      E2E_PRICE_LOOKUP_SCENARIO.INACTIVE_COMBO
    ),
    inactiveExtra: resolve(
      E2E_PRICE_LOOKUP_SCENARIO.INACTIVE_EXTRA
    ),
    nationalCombo: resolve(
      E2E_PRICE_LOOKUP_SCENARIO.NATIONAL_COMBO
    ),
  };
};

const seedCatalog = async (
  names: PriceLookupNames,
  ledger: PriceLookupLedger,
  workerId: string
): Promise<void> => {
  const activeCategoryId = await insertPriceLookupCategory(
    names.activeCategory,
    E2E_PRICE_LOOKUP_STATUS.ACTIVE,
    workerId
  );
  ledger.categoryIds.push(activeCategoryId);
  ledger.categoryIds.push(
    await insertPriceLookupCategory(
      names.inactiveCategory,
      E2E_PRICE_LOOKUP_STATUS.INACTIVE,
      workerId
    )
  );

  const extras = [
    {
      name: names.activeExtra,
      priceCrc: E2E_PRICE_LOOKUP_AMOUNT.EXTRA_BOTH_CRC,
      priceUsd: E2E_PRICE_LOOKUP_AMOUNT.EXTRA_BOTH_USD,
      status: E2E_PRICE_LOOKUP_STATUS.ACTIVE,
    },
    {
      name: names.foreignOnlyExtra,
      priceCrc: null,
      priceUsd:
        E2E_PRICE_LOOKUP_AMOUNT.EXTRA_FOREIGN_ONLY_USD,
      status: E2E_PRICE_LOOKUP_STATUS.ACTIVE,
    },
    {
      name: names.inactiveExtra,
      priceCrc: E2E_PRICE_LOOKUP_AMOUNT.EXTRA_BOTH_CRC,
      priceUsd: E2E_PRICE_LOOKUP_AMOUNT.EXTRA_BOTH_USD,
      status: E2E_PRICE_LOOKUP_STATUS.INACTIVE,
    },
  ];
  for (const { name, ...input } of extras) {
    ledger.extraIds.push(
      (
        await insertExtra(name, {
          ...input,
          ...E2E_PRICE_LOOKUP_EXTRA_OCCUPANCY,
        })
      ).id
    );
  }

  const combos = [
    {
      audience: PRICE_LOOKUP_AUDIENCE.NATIONAL,
      name: names.nationalCombo,
      packagePriceCrc:
        E2E_PRICE_LOOKUP_AMOUNT.COMBO_NATIONAL_CRC,
      packagePriceUsd: null,
      status: E2E_PRICE_LOOKUP_STATUS.ACTIVE,
    },
    {
      audience: PRICE_LOOKUP_AUDIENCE.FOREIGN,
      name: names.foreignCombo,
      packagePriceCrc: null,
      packagePriceUsd:
        E2E_PRICE_LOOKUP_AMOUNT.COMBO_FOREIGN_USD,
      status: E2E_PRICE_LOOKUP_STATUS.ACTIVE,
    },
    {
      audience: PRICE_LOOKUP_AUDIENCE.NATIONAL,
      name: names.inactiveCombo,
      packagePriceCrc:
        E2E_PRICE_LOOKUP_AMOUNT.COMBO_NATIONAL_CRC,
      packagePriceUsd: null,
      status: E2E_PRICE_LOOKUP_STATUS.INACTIVE,
    },
  ];
  for (const combo of combos) {
    ledger.comboIds.push(
      await insertPriceLookupCombo(
        { ...combo, categoryId: activeCategoryId },
        workerId
      )
    );
  }
};

export const createPriceLookupFixture = async (
  projectName: string,
  workerId: string
): Promise<PriceLookupFixture> => {
  const names = buildNames(projectName);
  const ledger: PriceLookupLedger = {
    categoryIds: [],
    comboIds: [],
    extraIds: [],
  };
  const remove = (): Promise<void> =>
    removePriceLookupRecords(ledger);

  try {
    await seedCatalog(names, ledger, workerId);
  } catch (error) {
    await remove();
    throw error;
  }

  return { names, remove };
};
