import { test as base } from "@playwright/test";
import {
  DEFAULT_COMBO_SEED_INPUT,
  resolveComboFixtureName,
} from "../constants/E2eComboList.constants";
import type { ComboListFixtures } from "../models/ComboListFixtures.interface";
import { createComboListPage } from "../pages/ComboList.page";
import {
  insertCombo,
  insertComboSale,
  removeComboSales,
  removeCombos,
} from "./comboFixtures";
import { logInAsAdmin } from "./logInAsAdmin";

export const test = base.extend<ComboListFixtures>({
  listPage: async ({ page }, provide) => {
    await provide(createComboListPage(page));
  },
  seedCombo: async ({ page }, provide, testInfo) => {
    const seededIds: string[] = [];
    await logInAsAdmin(page);

    await provide(async (overrides = {}) => {
      const { scenario, ...input } = {
        ...DEFAULT_COMBO_SEED_INPUT,
        ...overrides,
      };
      const seeded = await insertCombo(
        resolveComboFixtureName(
          testInfo.project.name,
          scenario
        ),
        input
      );
      seededIds.push(seeded.id);

      return seeded;
    });

    if (seededIds.length > 0) {
      await removeComboSales(seededIds);
      await removeCombos(seededIds);
    }
  },
  seedSoldCombo: async ({ seedCombo }, provide) => {
    await provide(async (overrides = {}) => {
      const combo = await seedCombo(overrides);
      await insertComboSale(combo.id);

      return combo;
    });
  },
});
