import { useState } from "react";
import { RESERVATION_FORM_DEFAULT_VALUES } from "../constants/ReservationFormUi.constants";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { ReservationFormValueUpdater } from "../models/ReservationFormValueUpdater.type";
import { useReservationFormNumericFields } from "../hooks/useReservationFormNumericFields";
import { useReservationFormScheduleFields } from "../hooks/useReservationFormScheduleFields";
import { useReservationFormSelectionFields } from "../hooks/useReservationFormSelectionFields";
import { RESERVATION_FORM_SELECTION_TEST } from "./ReservationFormSelectionFields.constants";

export const useSelectionHarness = () => {
  const [values, setValues] =
    useState<ReservationFormInput>({
      ...RESERVATION_FORM_DEFAULT_VALUES,
      categoryId:
        RESERVATION_FORM_SELECTION_TEST.SELECTED_CATEGORY_ID,
      extraIds: [
        RESERVATION_FORM_SELECTION_TEST.EXISTING_EXTRA_ID,
      ],
      unitId:
        RESERVATION_FORM_SELECTION_TEST.SELECTED_UNIT_ID,
    });
  const updateValue: ReservationFormValueUpdater = (
    field,
    value
  ) =>
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

  return {
    ...useReservationFormScheduleFields(updateValue),
    ...useReservationFormNumericFields(updateValue),
    ...useReservationFormSelectionFields(
      updateValue,
      values,
      []
    ),
    values,
  };
};
