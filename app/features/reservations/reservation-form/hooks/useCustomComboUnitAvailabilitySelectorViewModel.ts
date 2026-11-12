import { useEffect } from "react";
import { INDEX, STRING } from "@/app/constants";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { CustomComboUnitAvailabilitySelectorProps } from "../models/CustomComboUnitAvailabilitySelectorProps.interface";
import type { CustomComboUnitAvailabilitySelectorViewModel } from "../models/CustomComboUnitAvailabilitySelectorViewModel.interface";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";
import { useReservationUnitAvailability } from "./useReservationUnitAvailability";

const createAvailabilityRequest = (
  props: CustomComboUnitAvailabilitySelectorProps
): ReservationUnitAvailabilityInput => ({
  categoryId: props.categoryId,
  date: props.date,
  durationMinutes: Math.round(
    props.durationHours *
      RESERVATION_SCHEDULE.MINUTES_PER_HOUR
  ),
  time: props.time,
});

const clearUnavailableUnit = (
  availableUnits: ReservationCategoryUnitOption[],
  isLoading: boolean,
  hasLoaded: boolean,
  hasError: boolean,
  selectedUnitId: string,
  onChange: (unitId: string) => void
): void => {
  if (!selectedUnitId) {
    return;
  }
  if (isLoading) {
    onChange(STRING.Empty);
    return;
  }
  if (!hasLoaded || hasError) {
    return;
  }
  if (
    !availableUnits.some(
      (unit) => unit.id === selectedUnitId
    )
  ) {
    onChange(STRING.Empty);
  }
};

export const useCustomComboUnitAvailabilitySelectorViewModel =
  (
    props: CustomComboUnitAvailabilitySelectorProps
  ): CustomComboUnitAvailabilitySelectorViewModel => {
    const request = createAvailabilityRequest(props);
    const availability = useReservationUnitAvailability(
      request,
      INDEX.ZERO
    );
    const isScheduleValid =
      isReservationUnitAvailabilityInput(request);

    useEffect(() => {
      clearUnavailableUnit(
        availability.availableUnits,
        availability.isLoading,
        availability.isResolvedForCurrentRequest,
        availability.hasError,
        props.selectedUnitId,
        props.onChange
      );
    }, [
      availability.availableUnits,
      availability.hasError,
      availability.isResolvedForCurrentRequest,
      availability.isLoading,
      props.onChange,
      props.selectedUnitId,
    ]);

    return {
      availableUnits: availability.availableUnits,
      hasError: availability.hasError,
      isLoading: availability.isLoading,
      categoryId: props.categoryId,
      categoryName: props.categoryName,
      isScheduleValid,
      selectedUnitId: props.selectedUnitId,
      onChange: props.onChange,
    };
  };
