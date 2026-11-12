import { TYPE_OF } from "@/app/constants";
import { PREDEFINED_COMBO_RESERVATION } from "../constants/PredefinedComboReservation.constants";
import type { PredefinedComboReservationInput } from "../models/PredefinedComboReservationInput.interface";

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === TYPE_OF.OBJECT &&
  value !== null &&
  !Array.isArray(value);

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

const isNumber = (value: unknown): value is number =>
  typeof value === TYPE_OF.NUMBER;

export const isPredefinedComboReservationInput = (
  input: unknown
): input is PredefinedComboReservationInput => {
  if (!isRecord(input)) {
    return false;
  }

  return (
    "comboId" in input &&
    isString(input.comboId) &&
    PREDEFINED_COMBO_RESERVATION.UUID_PATTERN.test(
      input.comboId
    ) &&
    "customerName" in input &&
    isString(input.customerName) &&
    "date" in input &&
    isString(input.date) &&
    "durationHours" in input &&
    isNumber(input.durationHours) &&
    (!("guideIds" in input) ||
      (Array.isArray(input.guideIds) &&
        Object.keys(input.guideIds).length ===
          input.guideIds.length &&
        input.guideIds.every((guideId) =>
          isString(guideId)
        ))) &&
    "peopleCount" in input &&
    isNumber(input.peopleCount) &&
    "time" in input &&
    isString(input.time)
  );
};
