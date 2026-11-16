import { E2E_OCCUPIED_CATEGORY_NAME } from "../constants/E2eExtraOccupancy.constants";
import type { ExtraOccupancyFixtures } from "../models/ExtraOccupancyFixtures.interface";
import { findCategoryIdByName } from "./extraOccupancyFixtures";
import { test as extraFormTest } from "./extraFormTest";

export const test = extraFormTest.extend<
  Pick<ExtraOccupancyFixtures, "occupiableCategoryId">
>({
  occupiableCategoryId: async (
    { formPage: _formPage },
    provide
  ) => {
    await provide(
      await findCategoryIdByName(E2E_OCCUPIED_CATEGORY_NAME)
    );
  },
});
