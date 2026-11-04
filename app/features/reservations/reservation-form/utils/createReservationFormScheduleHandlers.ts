import { RESERVATION_FORM_MINIMUM_INPUT_VALUE } from "../constants/ReservationFormUi.constants";
import { STRING } from "@/app/constants";
import type { ReservationFormValueUpdater } from "../models/ReservationFormValueUpdater.type";

export const createReservationFormScheduleHandlers = (
  updateValue: ReservationFormValueUpdater
) => ({
  handleDateChange: (value: string): void => {
    updateValue("date", value);
    updateValue("unitId", STRING.Empty);
  },
  handleDurationChange: (value: number): void => {
    if (
      Number.isFinite(value) &&
      value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
    ) {
      updateValue("durationHours", value);
      updateValue("unitId", STRING.Empty);
    }
  },
  handleTimeChange: (value: string): void => {
    updateValue("time", value);
    updateValue("unitId", STRING.Empty);
  },
});
