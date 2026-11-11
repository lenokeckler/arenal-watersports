import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationUnitCategoryOption } from "../models/ReservationUnitCategoryOption.interface";

export const resolveReservationCategoryInterchangeability =
  (
    categories: ReservationCategoryOption[],
    unitCategories: ReservationUnitCategoryOption[]
  ): ReservationCategoryOption[] =>
    categories.map((category) =>
      unitCategories.some(
        (unitCategory) => unitCategory.id === category.id
      )
        ? { ...category, isInterchangeable: false }
        : category
    );
