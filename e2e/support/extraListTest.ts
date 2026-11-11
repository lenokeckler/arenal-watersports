import { test as base } from "@playwright/test";
import {
  DEFAULT_EXTRA_SEED_INPUT,
  resolveExtraFixtureName,
} from "../constants/E2eExtraList.constants";
import type { ExtraListFixtures } from "../models/ExtraListFixtures.interface";
import { createExtraListPage } from "../pages/ExtraList.page";
import { insertExtra, removeExtras } from "./extraFixtures";
import {
  insertExtraUsage,
  removeExtraUsages,
} from "./extraUsageFixtures";
import { logInAsAdmin } from "./logInAsAdmin";

export const test = base.extend<ExtraListFixtures>({
  listPage: async ({ page }, provide) => {
    await provide(createExtraListPage(page));
  },
  seedExtra: async ({ page }, provide, testInfo) => {
    const seededIds: string[] = [];
    await logInAsAdmin(page);

    await provide(async (overrides = {}) => {
      const input = {
        ...DEFAULT_EXTRA_SEED_INPUT,
        ...overrides,
      };
      const seeded = await insertExtra(
        resolveExtraFixtureName(
          testInfo.project.name,
          input.scenario
        ),
        input
      );
      seededIds.push(seeded.id);

      return seeded;
    });

    await removeExtras(seededIds);
  },
  seedUsedExtra: async ({ seedExtra }, provide) => {
    const reservationIds: string[] = [];

    await provide(async (overrides = {}) => {
      const extra = await seedExtra(overrides);
      const reservationId = await insertExtraUsage(
        extra.id
      );
      reservationIds.push(reservationId);

      return { ...extra, reservationId };
    });

    await removeExtraUsages(reservationIds);
  },
});
