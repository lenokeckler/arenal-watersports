import type { NullableRef } from "@/app/types";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationEditEquipment } from "../models/ReservationEditEquipment.interface";

export const mergeReservationEditCategories = (
  categories: ReservationCategoryOption[],
  equipment: NullableRef<ReservationEditEquipment>
): ReservationCategoryOption[] => {
  if (
    !equipment ||
    categories.some(
      (category) => category.id === equipment.categoryId
    )
  ) {
    return categories;
  }

  return [
    ...categories,
    {
      id: equipment.categoryId,
      isInterchangeable: equipment.unitId === null,
      name: equipment.categoryName,
    },
  ];
};
