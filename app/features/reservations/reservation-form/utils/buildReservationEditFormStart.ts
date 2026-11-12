import { STRING } from "@/app/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import {
  RESERVATION_DURATION_PRESETS,
  RESERVATION_FORM_DEFAULT_VALUES,
} from "../constants/ReservationFormUi.constants";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import type { ReservationEdit } from "../models/ReservationEdit.interface";
import type { ReservationEditFormStart } from "../models/ReservationEditFormStart.interface";

export const buildReservationEditFormStart = (
  reservation: ReservationEdit
): ReservationEditFormStart => {
  const { equipment } = reservation;
  const durationHours =
    reservation.durationMinutes /
    RESERVATION_SCHEDULE.MINUTES_PER_HOUR;
  const isPresetDuration =
    RESERVATION_DURATION_PRESETS.some(
      (preset) => preset.hours === durationHours
    );

  return {
    customDurationDraft: isPresetDuration
      ? STRING.Empty
      : durationHours.toString(),
    values: {
      ...RESERVATION_FORM_DEFAULT_VALUES,
      ...(equipment && {
        categoryId: equipment.categoryId,
        quantity: equipment.quantity,
        unitId: safeString(equipment.unitId),
      }),
      customerName: reservation.customerName,
      date: reservation.date,
      durationHours,
      peopleCount: reservation.peopleCount,
      time: reservation.time,
    },
  };
};
