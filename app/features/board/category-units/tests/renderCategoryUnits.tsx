import { render } from "@testing-library/react";
import type { NullableUndefined } from "@/app/types";
import CategoryUnits from "../CategoryUnits";
import { CATEGORY_ID } from "./CategoryUnitsScreen.constants";
import { createCategoryUnitsScreenPage } from "./CategoryUnitsScreen.page";

export const renderCategoryUnits = async (
  pageParam?: NullableUndefined<string | string[]>
) => {
  render(
    await CategoryUnits({
      categoryId: CATEGORY_ID,
      pageParam,
    })
  );

  return createCategoryUnitsScreenPage();
};
