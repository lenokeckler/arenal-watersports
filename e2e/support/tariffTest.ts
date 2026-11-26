import { test as base } from "@playwright/test";
import {
  DEFAULT_TARIFF_SEED_INPUT,
  resolveTariffFixtureName,
} from "../constants/E2eTariff.constants";
import type { SeededTariffCategory } from "../models/SeededTariffCategory.interface";
import type { TariffFixtures } from "../models/TariffFixtures.interface";
import { createTariffFormPage } from "../pages/TariffForm.page";
import { createTariffListPage } from "../pages/TariffList.page";
import { logInAsAdmin } from "./logInAsAdmin";
import {
  insertTariffCategory,
  insertTariffs,
  removeTariffCategory,
} from "./tariffFixtures";

export const test = base.extend<TariffFixtures>({
  formPage: async ({ page }, provide) => {
    await provide(createTariffFormPage(page));
  },
  listPage: async ({ page }, provide) => {
    await provide(createTariffListPage(page));
  },
  seedTariffCategory: async (
    { page },
    provide,
    testInfo
  ) => {
    const seeded: SeededTariffCategory[] = [];
    await logInAsAdmin(page);

    await provide(async (overrides = {}) => {
      const { scenario, ...tariffs } = {
        ...DEFAULT_TARIFF_SEED_INPUT,
        ...overrides,
      };
      const categoryName = resolveTariffFixtureName(
        testInfo.project.name,
        scenario
      );
      const categoryId =
        await insertTariffCategory(categoryName);
      const category = { categoryId, categoryName };
      seeded.push(category);
      await insertTariffs(categoryId, tariffs);

      return category;
    });

    for (const { categoryId, categoryName } of seeded) {
      await removeTariffCategory(categoryId, categoryName);
    }
  },
});
