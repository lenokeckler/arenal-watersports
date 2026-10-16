import type { ReservationFormField } from "../models/ReservationFormField.constants";
import { useReservationFormValues } from "./useReservationFormValues";

export const useReservationFormFields = (
  initialDate: string,
  initialCategoryId: string,
  clearFieldError: (field: ReservationFormField) => void
) => {
  const { updateValue, values } = useReservationFormValues(
    initialDate,
    initialCategoryId,
    clearFieldError
  );

  return {
    handleCategoryChange: (value: string) =>
      updateValue("categoryId", value),
    handleCustomerNameChange: (value: string) =>
      updateValue("customerName", value),
    handleDateChange: (value: string) =>
      updateValue("date", value),
    handleDurationChange: (value: number) =>
      updateValue("durationHours", value),
    handlePeopleCountChange: (value: number) =>
      updateValue("peopleCount", value),
    handleQuantityChange: (value: number) =>
      updateValue("quantity", value),
    handleTimeChange: (value: string) =>
      updateValue("time", value),
    values,
  };
};
