import { render } from "@testing-library/react";
import CategoryUnitsList from "../components/CategoryUnitsList";
import {
  CATEGORY_NAME,
  CATEGORY_UNITS,
} from "./CategoryUnits.constants";
import { createCategoryUnitsPage } from "./CategoryUnits.page";

export const renderCategoryUnitsList = () => {
  render(
    <CategoryUnitsList
      categoryName={CATEGORY_NAME}
      image={null}
      units={CATEGORY_UNITS}
    />
  );

  return createCategoryUnitsPage();
};
