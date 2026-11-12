import { useEffect, useEffectEvent, useState } from "react";
import { STRING } from "@/app/constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { ReservationFormFieldsOptions } from "../models/ReservationFormFieldsOptions.interface";
import type { ReservationFormFieldsViewModel } from "../models/ReservationFormFieldsViewModel.interface";
import type { UpdateReservationFormValue } from "../models/UpdateReservationFormValue.type";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { createReservationTypeChangeHandler } from "../utils/createReservationTypeChangeHandler";
import { createReservationFormNumericFieldHandlers } from "../utils/createReservationFormNumericFieldHandlers";
import { useReservationFormValues } from "./useReservationFormValues";
import { useReservationExtraSelection } from "./useReservationExtraSelection";
import { useReservationGuideSelection } from "./useReservationGuideSelection";

const createBasicFieldHandlers = (
  values: ReservationFormInput,
  updateValue: UpdateReservationFormValue,
  clearSelectionResetNotice: () => void,
  clearUnitAfterScheduleChange: () => void
) => ({
  handleCategoryChange: (value: string) => {
    if (values.categoryId === value) {
      return;
    }
    clearSelectionResetNotice();
    updateValue(RESERVATION_FORM_FIELD.EXTRA_IDS, []);
    updateValue(RESERVATION_FORM_FIELD.CATEGORY_ID, value);
    updateValue(
      RESERVATION_FORM_FIELD.UNIT_ID,
      STRING.Empty
    );
  },
  handleCustomerNameChange: (value: string) =>
    updateValue(
      RESERVATION_FORM_FIELD.CUSTOMER_NAME,
      value
    ),
  handleDateChange: (value: string) => {
    updateValue(RESERVATION_FORM_FIELD.DATE, value);
    updateValue(RESERVATION_FORM_FIELD.EXTRA_IDS, []);
    updateValue(
      RESERVATION_FORM_FIELD.UNIT_ID,
      STRING.Empty
    );
  },
  handleTimeChange: (value: string) => {
    updateValue(RESERVATION_FORM_FIELD.TIME, value);
    updateValue(RESERVATION_FORM_FIELD.EXTRA_IDS, []);
    clearUnitAfterScheduleChange();
  },
  handleUnitChange: (value: string) => {
    if (values.unitId === value) {
      return;
    }
    clearSelectionResetNotice();
    updateValue(RESERVATION_FORM_FIELD.EXTRA_IDS, []);
    updateValue(RESERVATION_FORM_FIELD.UNIT_ID, value);
  },
});

export const useReservationFormFields = (
  initialDate: string,
  initialCategoryId: string,
  clearFieldError: (field: ReservationFormField) => void,
  options: ReservationFormFieldsOptions = {}
): ReservationFormFieldsViewModel => {
  const { reset, updateValue, values } =
    useReservationFormValues(
      initialDate,
      initialCategoryId,
      clearFieldError,
      options.initialValues
    );
  const [
    hasReservationTypeSelectionReset,
    setHasReservationTypeSelectionReset,
  ] = useState(false);
  const handleReservationTypeChange =
    createReservationTypeChangeHandler(
      values,
      updateValue,
      setHasReservationTypeSelectionReset
    );
  const guideSelection = useReservationGuideSelection(
    values,
    updateValue
  );
  const extraSelection = useReservationExtraSelection(
    values,
    updateValue
  );
  const reconcileLoadedGuides = useEffectEvent(() => {
    if (options.guideOptions !== undefined) {
      guideSelection.reconcileGuideSelection(
        options.guideOptions.map((guide) => guide.id)
      );
    }
  });
  useEffect(() => {
    reconcileLoadedGuides();
  }, [options.guideOptions]);
  const clearUnitAfterScheduleChange = (): void => {
    if (!options.keepsUnitOnScheduleChange) {
      updateValue(
        RESERVATION_FORM_FIELD.UNIT_ID,
        STRING.Empty
      );
    }
  };

  return {
    ...createBasicFieldHandlers(
      values,
      updateValue,
      () => setHasReservationTypeSelectionReset(false),
      clearUnitAfterScheduleChange
    ),
    ...createReservationFormNumericFieldHandlers(
      updateValue,
      clearUnitAfterScheduleChange
    ),
    ...guideSelection,
    ...extraSelection,
    reset: () => {
      reset();
      setHasReservationTypeSelectionReset(false);
    },
    handleReservationTypeChange: (
      value,
      currentCategories
    ) =>
      handleReservationTypeChange(
        value,
        currentCategories ?? options.liveCategories ?? []
      ),
    hasReservationTypeSelectionReset,
    values,
  };
};
