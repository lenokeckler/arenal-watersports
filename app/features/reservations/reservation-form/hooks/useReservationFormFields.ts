import { RESERVATION_FORM_MINIMUM_INPUT_VALUE } from "../constants/ReservationFormUi.constants";
import { STRING } from "@/app/constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationType } from "../models/ReservationType.type";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationFormValues } from "./useReservationFormValues";

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
    handleCategoryChange: (value: string) => {
      updateValue("categoryId", value);
      updateValue("unitId", STRING.Empty);
    },
    handleCustomerNameChange: (value: string) =>
      updateValue("customerName", value),
    handleDateChange: (value: string) => {
      updateValue("date", value);
      updateValue("unitId", STRING.Empty);
    },
    handleDurationChange: (value: number) => {
      if (
        Number.isFinite(value) &&
        value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
      ) {
        updateValue("durationHours", value);
        updateValue("unitId", STRING.Empty);
      }
    },
    handlePeopleCountChange: (value: number) => {
      if (
        Number.isFinite(value) &&
        value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
      ) {
        updateValue("peopleCount", value);
      }
    },
    handleQuantityChange: (value: number) => {
      if (
        Number.isFinite(value) &&
        value >= RESERVATION_FORM_MINIMUM_INPUT_VALUE
      ) {
        updateValue("quantity", value);
      }
    },
    handleReservationTypeChange: (
      value: ReservationType
    ) => {
      updateValue("reservationType", value);
      const selectedCategory = categories.find(
        (category) => category.id === values.categoryId
      );
      if (
        value !== RESERVATION_TYPE.TOUR &&
        selectedCategory?.isGuideOnly
      ) {
        updateValue("categoryId", STRING.Empty);
        updateValue("unitId", STRING.Empty);
      }
    },
    handleTimeChange: (value: string) => {
      updateValue("time", value);
      updateValue("unitId", STRING.Empty);
    },
    handleUnitChange: (value: string) =>
      updateValue("unitId", value),
    values,
  };
};
