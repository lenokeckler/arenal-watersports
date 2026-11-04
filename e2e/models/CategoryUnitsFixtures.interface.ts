import type { UnitStatus } from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import type { createCategoryUnitFormPage } from "../pages/CategoryUnitForm.page";
import type { createCategoryUnitListPage } from "../pages/CategoryUnitList.page";
import type { CategoryFixtureBehavior } from "./CategoryFixtureBehavior.interface";
import type { SeededUnitCategory } from "./SeededUnitCategory.interface";

export interface CategoryUnitsFixtures {
  formPage: ReturnType<typeof createCategoryUnitFormPage>;
  listPage: ReturnType<typeof createCategoryUnitListPage>;
  seedUnitCategory: (
    scenario: string,
    behavior?: Partial<CategoryFixtureBehavior>,
    statuses?: UnitStatus[]
  ) => Promise<SeededUnitCategory>;
}
