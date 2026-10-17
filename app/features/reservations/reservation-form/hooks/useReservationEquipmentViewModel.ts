import { STRING } from "@/app/constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { useReservationUnitAvailability } from "./useReservationUnitAvailability";

export const useReservationEquipmentViewModel = (
  categories: ReservationCategoryOption[],
  values: ReservationFormInput,
  durationHours: number,
  refreshKey: number
) => {
  const selectedCategory = categories.find(
    (category) => category.id === values.categoryId
  );
  const requiresConcreteUnit =
    selectedCategory?.isInterchangeable === false;
  const request = {
    categoryId: requiresConcreteUnit
      ? values.categoryId
      : STRING.Empty,
    date: values.date,
    durationMinutes: Math.round(
      durationHours * RESERVATION_SCHEDULE.MINUTES_PER_HOUR
    ),
    time: values.time,
  };
  const availability = useReservationUnitAvailability(
    request,
    refreshKey
  );

  return {
    availableUnits: requiresConcreteUnit
      ? availability.availableUnits
      : [],
    hasAvailabilityError: availability.hasError,
    isAvailabilityLoading: availability.isLoading,
    requiresConcreteUnit,
  };
};
