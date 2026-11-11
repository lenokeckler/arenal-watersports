import { test as base } from "@playwright/test";
import { createCategoryUnitFormPage } from "../pages/CategoryUnitForm.page";
import { createCategoryUnitListPage } from "../pages/CategoryUnitList.page";
import {
  resolveCategoryUnitsFixtureName,
  resolveUnitFixtureCode,
} from "../constants/E2eCategoryUnits.constants";
import type { CategoryUnitsFixtures } from "../models/CategoryUnitsFixtures.interface";
import type { UnitReservationFixtureHandle } from "../models/UnitReservationFixtureHandle.interface";
import { E2E_UNIT_RESERVATION } from "../constants/E2eUnitReservationHistory.constants";
import { createUnitReservationFixture } from "./createUnitReservationFixture";
import { findCategoryId } from "./categoryFixtures";
import { logInAsAdmin } from "./logInAsAdmin";
import {
  removeCategoryWithUnits,
  seedCategoryWithUnits,
} from "./unitFixtures";

export const test = base.extend<CategoryUnitsFixtures>({
  formPage: async ({ page }, provide) => {
    await provide(createCategoryUnitFormPage(page));
  },
  listPage: async ({ page }, provide) => {
    await provide(createCategoryUnitListPage(page));
  },
  seedUnitCategory: async ({ page }, provide, testInfo) => {
    const projectName = testInfo.project.name;
    const seededNames: string[] = [];
    await logInAsAdmin(page);

    await provide(
      async (scenario, behavior = {}, statuses = []) => {
        const categoryName =
          resolveCategoryUnitsFixtureName(
            projectName,
            scenario
          );
        const codes = statuses.map((status, index) =>
          resolveUnitFixtureCode(
            projectName,
            scenario,
            `-${index}`
          )
        );
        seededNames.push(categoryName);
        await seedCategoryWithUnits(
          categoryName,
          behavior,
          statuses.map((status, index) => ({
            code: codes[index],
            status,
          }))
        );

        return {
          categoryId: await findCategoryId(categoryName),
          categoryName,
          code: resolveUnitFixtureCode(
            projectName,
            scenario
          ),
          codes,
        };
      }
    );

    for (const categoryName of seededNames) {
      await removeCategoryWithUnits(categoryName);
    }
  },
  seedUnitReservations: async (
    { seedUnitCategory: _seedUnitCategory },
    provide
  ) => {
    const handles: UnitReservationFixtureHandle[] = [];

    await provide(async (unitId, seeds) => {
      const handle = await createUnitReservationFixture(
        unitId,
        seeds
      );
      handles.push(handle);

      return handle.records;
    });

    const failures: unknown[] = [];
    for (const handle of handles) {
      try {
        await handle.cleanup();
      } catch (error) {
        failures.push(error);
      }
    }
    if (failures.length > 0) {
      throw new AggregateError(
        failures,
        E2E_UNIT_RESERVATION.CLEANUP_FAILED
      );
    }
  },
});
