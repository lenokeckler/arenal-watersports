"use client";

import CategoryUnitsError from "@/app/features/board/category-units/components/CategoryUnitsError";
import type { CategoryUnitsErrorProps } from "@/app/features/board/category-units/models/CategoryUnitsErrorProps.interface";

const CategoryUnitsRouteError = ({
  reset,
}: CategoryUnitsErrorProps): React.JSX.Element => (
  <CategoryUnitsError reset={reset} />
);

export default CategoryUnitsRouteError;
