import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { CustomComboConflictRequest } from "../models/CustomComboConflictRequest.interface";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { isReservationUnitAvailabilityInput } from "./isReservationUnitAvailabilityInput";

export const buildCustomComboConflictRequest = (
  selections: CustomComboEquipmentSelection[],
  date: string,
  durationHours: number,
  time: string,
  retryRevision: number
): CustomComboConflictRequest => {
  const categoryIds = [
    ...new Set(
      selections.map(({ categoryId }) => categoryId)
    ),
  ].sort();
  const durationMinutes =
    durationHours * RESERVATION_SCHEDULE.MINUTES_PER_HOUR;
  const isValid =
    categoryIds.length > 0 &&
    categoryIds.every((categoryId) =>
      isReservationUnitAvailabilityInput({
        categoryId,
        date,
        durationMinutes,
        time,
      })
    );
  return {
    categoryIds,
    date,
    durationMinutes,
    isValid,
    key: JSON.stringify({
      categoryIds,
      date,
      durationMinutes,
      retryRevision,
      time,
    }),
    time,
  };
};
