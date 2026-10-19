import { STRING } from "@/app/constants";
import type { ReservationFormValueUpdater } from "../models/ReservationFormValueUpdater.type";

export const useReservationFormScheduleFields = (
  updateValue: ReservationFormValueUpdater
) => ({
  handleCustomerNameChange: (value: string): void =>
    updateValue("customerName", value),
  handleDateChange: (value: string): void => {
    updateValue("date", value);
    updateValue("unitId", STRING.Empty);
  },
  handleTimeChange: (value: string): void => {
    updateValue("time", value);
    updateValue("unitId", STRING.Empty);
  },
});
