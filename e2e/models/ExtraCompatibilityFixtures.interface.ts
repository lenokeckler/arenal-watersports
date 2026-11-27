import type { createExtraCompatibilityCategoriesPage } from "../pages/ExtraCompatibilityCategories.page";
import type { createExtraCompatibilityUnitsPage } from "../pages/ExtraCompatibilityUnits.page";
import type { createExtraListPage } from "../pages/ExtraList.page";
import type { SeededExtra } from "./SeededExtra.interface";

export interface ExtraCompatibilityFixtures {
  extraListPage: ReturnType<typeof createExtraListPage>;
  categoriesPage: ReturnType<
    typeof createExtraCompatibilityCategoriesPage
  >;
  linkExtraToUnits: (
    extraId: string,
    unitCodes: string[]
  ) => Promise<void>;
  seedCompatibleExtra: (
    scenario: string
  ) => Promise<SeededExtra>;
  unitsPage: ReturnType<
    typeof createExtraCompatibilityUnitsPage
  >;
}
