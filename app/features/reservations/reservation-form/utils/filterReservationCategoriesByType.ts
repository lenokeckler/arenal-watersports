import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationType } from "../models/ReservationType.type";

export const filterReservationCategoriesByType = (
  categories: ReservationCategoryOption[],
  reservationType: ReservationType
): ReservationCategoryOption[] => {
  if (reservationType === RESERVATION_TYPE.COMBO) {
    return categories.filter(
      (category) => category.isInterchangeable
    );
  }

  if (reservationType === RESERVATION_TYPE.TOUR) {
    return categories;
  }

  return categories.filter(
    (category) => !category.isGuideOnly
  );
};
