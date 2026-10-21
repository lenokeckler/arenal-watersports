import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationType } from "../models/ReservationType.type";

export const filterReservationCategoriesByType = (
  categories: ReservationCategoryOption[],
  reservationType: ReservationType
): ReservationCategoryOption[] =>
  reservationType === RESERVATION_TYPE.TOUR ||
  reservationType === RESERVATION_TYPE.COMBO
    ? categories
    : categories.filter(
        (category) => !category.isGuideOnly
      );
