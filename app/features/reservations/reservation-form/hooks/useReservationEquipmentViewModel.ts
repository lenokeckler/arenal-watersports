import { STRING } from "@/app/constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { ReservationEquipmentViewModel } from "../models/ReservationEquipmentViewModel.interface";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { useReservationCategoryAvailabilityPanelViewModel } from "./useReservationCategoryAvailabilityPanelViewModel";
import { useReservationUnitAvailability } from "./useReservationUnitAvailability";

export const useReservationEquipmentViewModel = (
  categories: ReservationCategoryOption[],
  values: ReservationFormInput,
  durationHours: number,
  refreshKey: number
): ReservationEquipmentViewModel => {
  const selectedCategory = categories.find(
    (category) => category.id === values.categoryId
  );
  const requiresConcreteUnit =
    selectedCategory?.isInterchangeable === false;
  const durationMinutes = Math.round(
    durationHours * RESERVATION_SCHEDULE.MINUTES_PER_HOUR
  );
  const unitRequest = {
    categoryId: requiresConcreteUnit
      ? values.categoryId
      : STRING.Empty,
    date: values.date,
    durationMinutes,
    time: values.time,
  };
  const unitAvailability = useReservationUnitAvailability(
    unitRequest,
    refreshKey
  );
  const categoryAvailability =
    useReservationCategoryAvailabilityPanelViewModel({
      category: selectedCategory,
      refreshKey,
      request: {
        ...unitRequest,
        categoryId: values.categoryId,
      },
    });

  return {
    ...categoryAvailability,
    availableUnits: requiresConcreteUnit
      ? unitAvailability.availableUnits
      : [],
    hasAvailabilityError: unitAvailability.hasError,
    isAvailabilityLoading: unitAvailability.isLoading,
    requiresConcreteUnit,
  };
};
