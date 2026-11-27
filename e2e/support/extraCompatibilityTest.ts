import { mergeTests } from "@playwright/test";
import type { ExtraCompatibilityFixtures } from "../models/ExtraCompatibilityFixtures.interface";
import { createExtraCompatibilityCategoriesPage } from "../pages/ExtraCompatibilityCategories.page";
import { createExtraCompatibilityUnitsPage } from "../pages/ExtraCompatibilityUnits.page";
import { createExtraListPage } from "../pages/ExtraList.page";
import { test as categoryUnitsTest } from "./categoryUnitsTest";
import {
  linkExtraToUnitCodes,
  removeExtraLinks,
} from "./extraCompatibilityFixtures";
import { test as extraListTest } from "./extraListTest";

export const test = mergeTests(
  extraListTest,
  categoryUnitsTest
).extend<ExtraCompatibilityFixtures>({
  extraListPage: async ({ page }, provide) => {
    await provide(createExtraListPage(page));
  },
  categoriesPage: async ({ page }, provide) => {
    await provide(
      createExtraCompatibilityCategoriesPage(page)
    );
  },
  unitsPage: async ({ page }, provide) => {
    await provide(createExtraCompatibilityUnitsPage(page));
  },
  seedCompatibleExtra: async (
    { seedExtra, seedUnitCategory: _seedUnitCategory },
    provide
  ) => {
    const extraIds: string[] = [];

    await provide(async (scenario) => {
      const extra = await seedExtra({ scenario });
      extraIds.push(extra.id);

      return extra;
    });

    await removeExtraLinks(extraIds);
  },
  linkExtraToUnits: async (
    { seedCompatibleExtra: _seedCompatibleExtra },
    provide
  ) => {
    await provide(linkExtraToUnitCodes);
  },
});
