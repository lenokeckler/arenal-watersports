import type { NullableRef } from "@/app/types";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import type { CustomComboReservationValidation } from "../models/CustomComboReservationValidation.interface";
import type { CustomComboReservationField } from "../models/CustomComboReservationField.constants";
import type { ValidatedCustomComboReservationInput } from "../models/ValidatedCustomComboReservationInput.interface";
import {
  isValidReservationDate,
  isValidReservationTime,
} from "./validateReservationSchedule";
import { isValidCustomComboPricingDuration } from "./isValidCustomComboPricingDuration";
import { hasValidCustomComboEquipmentSelections } from "./hasValidCustomComboEquipmentSelections";

const isPositiveInteger = (value: number): boolean =>
  Number.isInteger(value) && value > 0;

const buildValidatedInput = (
  input: CustomComboReservationInput
): ValidatedCustomComboReservationInput => ({
  agreedAmountCrc: input.agreedAmountCrc,
  agreedAmountUsd: input.agreedAmountUsd,
  customerName: input.customerName.trim(),
  date: input.date,
  durationMinutes:
    input.durationHours *
    RESERVATION_SCHEDULE.MINUTES_PER_HOUR,
  guideIds: input.guideIds ?? [],
  items: input.items.map((selection) => ({
    categoryId: selection.categoryId.trim(),
    quantity: selection.quantity,
  })),
  peopleCount: input.peopleCount,
  time: input.time,
});

const addError = (
  errors: CustomComboReservationValidation["errors"],
  field: CustomComboReservationField,
  isValid: boolean,
  message: string
): void => {
  if (!isValid) {
    errors[field] = message;
  }
};

const validateScheduleFields = (
  input: CustomComboReservationInput
): CustomComboReservationValidation["errors"] => {
  const errors: CustomComboReservationValidation["errors"] =
    {};

  addError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.CUSTOMER_NAME,
    Boolean(input.customerName.trim()),
    RESERVATION_FORM_COPY[
      CUSTOM_COMBO_RESERVATION_FIELD.CUSTOMER_NAME
    ]
  );
  addError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.DATE,
    isValidReservationDate(input.date),
    RESERVATION_FORM_COPY[
      CUSTOM_COMBO_RESERVATION_FIELD.DATE
    ]
  );
  addError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.DURATION_HOURS,
    isValidCustomComboPricingDuration(input.durationHours),
    RESERVATION_FORM_COPY[
      CUSTOM_COMBO_RESERVATION_FIELD.DURATION_HOURS
    ]
  );
  addError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.TIME,
    isValidReservationTime(input.time),
    RESERVATION_FORM_COPY[
      CUSTOM_COMBO_RESERVATION_FIELD.TIME
    ]
  );

  return errors;
};

const validateSelectionFields = (
  input: CustomComboReservationInput
): CustomComboReservationValidation["errors"] => {
  const errors: CustomComboReservationValidation["errors"] =
    {};

  addError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.ITEMS,
    hasValidCustomComboEquipmentSelections(input.items),
    CUSTOM_COMBO_RESERVATION_COPY.ITEM_SELECTION
  );
  addError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.PEOPLE_COUNT,
    isPositiveInteger(input.peopleCount),
    RESERVATION_FORM_COPY[
      CUSTOM_COMBO_RESERVATION_FIELD.PEOPLE_COUNT
    ]
  );

  return errors;
};

const validateFields = (
  input: CustomComboReservationInput
): CustomComboReservationValidation["errors"] => ({
  ...validateScheduleFields(input),
  ...validateSelectionFields(input),
});

const isValidAgreedAmount = (
  amount: NullableRef<number>
): boolean =>
  amount === null ||
  (Number.isFinite(amount) && amount >= 0);

export const validateCustomComboReservationInput = (
  input: CustomComboReservationInput
): CustomComboReservationValidation => {
  const errors = validateFields(input);

  if (
    !isValidAgreedAmount(input.agreedAmountCrc) ||
    !isValidAgreedAmount(input.agreedAmountUsd)
  ) {
    errors[CUSTOM_COMBO_RESERVATION_FIELD.ITEMS] =
      CUSTOM_COMBO_RESERVATION_COPY.INVALID_INPUT;
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    value: isValid ? buildValidatedInput(input) : null,
  };
};
