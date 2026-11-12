import type { NullableRef } from "@/app/types";
import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import { isCustomComboEquipmentSelection } from "./isCustomComboEquipmentSelection";

const isNullableNumber = (
  input: unknown
): input is NullableRef<number> =>
  input === null || typeof input === "number";

export const isCustomComboReservationInput = (
  input: unknown
): input is CustomComboReservationInput => {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  return (
    "agreedAmountCrc" in input &&
    isNullableNumber(input.agreedAmountCrc) &&
    "agreedAmountUsd" in input &&
    isNullableNumber(input.agreedAmountUsd) &&
    "customerName" in input &&
    typeof input.customerName === "string" &&
    "date" in input &&
    typeof input.date === "string" &&
    "durationHours" in input &&
    typeof input.durationHours === "number" &&
    (!("guideIds" in input) ||
      (Array.isArray(input.guideIds) &&
        Object.keys(input.guideIds).length ===
          input.guideIds.length &&
        input.guideIds.every(
          (guideId) => typeof guideId === "string"
        ))) &&
    "items" in input &&
    Array.isArray(input.items) &&
    Object.keys(input.items).length ===
      input.items.length &&
    input.items.every(isCustomComboEquipmentSelection) &&
    "peopleCount" in input &&
    typeof input.peopleCount === "number" &&
    "time" in input &&
    typeof input.time === "string"
  );
};
