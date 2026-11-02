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
  const request = {
    categoryId: selectedCategory
      ? values.categoryId
      : STRING.Empty,
    date: values.date,
    durationMinutes: Math.round(
      durationHours * RESERVATION_SCHEDULE.MINUTES_PER_HOUR
    ),
    time: values.time,
  };
  const unitAvailability = useReservationUnitAvailability(
    request,
    refreshKey
  );
  const categoryAvailability =
    useReservationCategoryAvailabilityPanelViewModel({
      category: selectedCategory,
      refreshKey,
      request,
    });

  return {
    ...categoryAvailability,
    availableQuantity: selectedCategory?.isInterchangeable
      ? unitAvailability.availableQuantity
      : null,
    availableUnits: requiresConcreteUnit
      ? unitAvailability.availableUnits
      : [],
    hasAvailabilityError: unitAvailability.hasError,
    isAvailabilityResolved:
      unitAvailability.isResolvedForCurrentRequest,
    isAvailabilityLoading: unitAvailability.isLoading,
    requiresConcreteUnit,
    retryUnitAvailability: unitAvailability.retry,
  };
};
