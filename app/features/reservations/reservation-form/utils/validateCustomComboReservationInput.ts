import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import type { CustomComboReservationValidation } from "../models/CustomComboReservationValidation.interface";
import type { ValidatedCustomComboReservationInput } from "../models/ValidatedCustomComboReservationInput.interface";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import {
  isValidReservationDate,
  isValidReservationTime,
} from "./validateReservationSchedule";
import { isValidCustomComboPricingDuration } from "./isValidCustomComboPricingDuration";
import { hasValidCustomComboEquipmentSelections } from "./hasValidCustomComboEquipmentSelections";
import { addCustomComboReservationError } from "./addCustomComboReservationError";
import { validateCustomComboAgreedAmounts } from "./validateCustomComboAgreedAmounts";

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
  items: input.items.map((selection) =>
    selection.kind ===
    RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT
      ? {
          ...selection,
          categoryId: selection.categoryId.trim(),
          unitId: selection.unitId.trim(),
        }
      : {
          ...selection,
          categoryId: selection.categoryId.trim(),
        }
  ),
  peopleCount: input.peopleCount,
  time: input.time,
});

const validateScheduleFields = (
  input: CustomComboReservationInput
): CustomComboReservationValidation["errors"] => {
  const errors: CustomComboReservationValidation["errors"] =
    {};

  addCustomComboReservationError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.CUSTOMER_NAME,
    Boolean(input.customerName.trim()),
    RESERVATION_FORM_COPY[
      CUSTOM_COMBO_RESERVATION_FIELD.CUSTOMER_NAME
    ]
  );
  addCustomComboReservationError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.DATE,
    isValidReservationDate(input.date),
    RESERVATION_FORM_COPY[
      CUSTOM_COMBO_RESERVATION_FIELD.DATE
    ]
  );
  addCustomComboReservationError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.DURATION_HOURS,
    isValidCustomComboPricingDuration(input.durationHours),
    RESERVATION_FORM_COPY[
      CUSTOM_COMBO_RESERVATION_FIELD.DURATION_HOURS
    ]
  );
  addCustomComboReservationError(
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

  addCustomComboReservationError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.ITEMS,
    hasValidCustomComboEquipmentSelections(input.items),
    CUSTOM_COMBO_RESERVATION_COPY.ITEM_SELECTION
  );
  addCustomComboReservationError(
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
  ...validateCustomComboAgreedAmounts(input),
  ...validateScheduleFields(input),
  ...validateSelectionFields(input),
});

export const validateCustomComboReservationInput = (
  input: CustomComboReservationInput
): CustomComboReservationValidation => {
  const errors = validateFields(input);

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    value: isValid ? buildValidatedInput(input) : null,
  };
};
