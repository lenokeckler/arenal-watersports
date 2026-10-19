import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationFormValues } from "./useReservationFormValues";
import { useReservationFormScheduleFields } from "./useReservationFormScheduleFields";
import { useReservationFormNumericFields } from "./useReservationFormNumericFields";
import { useReservationFormSelectionFields } from "./useReservationFormSelectionFields";

export const useReservationFormFields = (
  initialDate: string,
  initialCategoryId: string,
  clearFieldError: (field: ReservationFormField) => void,
  categories: ReservationCategoryOption[]
) => {
  const { updateValue, values } = useReservationFormValues(
    initialDate,
    initialCategoryId,
    clearFieldError
  );
  return {
    ...useReservationFormScheduleFields(updateValue),
    ...useReservationFormNumericFields(updateValue),
    ...useReservationFormSelectionFields(
      updateValue,
      values,
      categories
    ),
    values,
  };
};
