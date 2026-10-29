import { STRING } from "@/app/constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { useReservationUnitAvailability } from "./useReservationUnitAvailability";

export const useReservationEquipmentViewModel = (
  categories: ReservationCategoryOption[],
  values: ReservationFormInput,
  durationHours: number
) => {
  const selectedCategory = categories.find(
    (category) => category.id === values.categoryId
  );
  const requiresConcreteUnit =
    selectedCategory?.isInterchangeable === false;
  const request = {
    categoryId: values.categoryId || STRING.Empty,
    date: values.date,
    durationMinutes: Math.round(
      durationHours * RESERVATION_SCHEDULE.MINUTES_PER_HOUR
    ),
    quantity: values.quantity,
    time: values.time,
  };
  const availability =
    useReservationUnitAvailability(request);

  return {
    availableUnits: requiresConcreteUnit
      ? availability.availableUnits
      : [],
    availableQuantity: availability.availableQuantity,
    hasRequestedQuantity: availability.hasRequestedQuantity,
    hasAvailabilityError: availability.hasError,
    isAvailabilityLoading: availability.isLoading,
    requiresConcreteUnit,
  };
};
