import { useCallback } from "react";
import { STRING } from "@/app/constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import { useReservationFormValues } from "./useReservationFormValues";
import { createReservationFormScheduleHandlers } from "../utils/createReservationFormScheduleHandlers";
import { createReservationFormCustomerHandlers } from "../utils/createReservationFormCustomerHandlers";

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
  const handleCategoryChange = useCallback(
    (value: string): void => {
      updateValue("categoryId", value);
      updateValue("unitId", STRING.Empty);
    },
    [updateValue]
  );
  const handleUnitChange = useCallback(
    (value: string): void => updateValue("unitId", value),
    [updateValue]
  );
  const scheduleHandlers =
    createReservationFormScheduleHandlers(updateValue);
  const customerHandlers =
    createReservationFormCustomerHandlers(updateValue);

  return {
    ...customerHandlers,
    handleCategoryChange,
    handleUnitChange,
    ...scheduleHandlers,
    values,
  };
};
