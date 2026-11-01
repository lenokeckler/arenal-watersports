import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { STRING } from "@/app/constants";
import {
  RESERVATION_CUSTOM_DURATION_INITIAL_HOURS,
  RESERVATION_FORM_MINIMUM_INPUT_VALUE,
} from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import { resolveReservationDurationHours } from "../utils/resolveReservationDurationHours";

const createReservationDurationHandlers = (
  setCustomDurationDraft: Dispatch<SetStateAction<string>>,
  setIsCustomDuration: Dispatch<SetStateAction<boolean>>,
  updateDurationValue: (hours: number) => void,
  clearFieldError: (field: ReservationFormField) => void
) => {
  const selectPreset = (hours: number): void => {
    setIsCustomDuration(false);
    setCustomDurationDraft(STRING.Empty);
    updateDurationValue(hours);
  };
  const selectCustomDuration = (): void => {
    setIsCustomDuration(true);
    setCustomDurationDraft(STRING.Empty);
    updateDurationValue(
      RESERVATION_CUSTOM_DURATION_INITIAL_HOURS
    );
  };
  const updateCustomDurationDraft = (
    value: string
  ): void => {
    const numericValue = Number(value);
    if (
      value !== STRING.Empty &&
      (!Number.isFinite(numericValue) ||
        numericValue < RESERVATION_FORM_MINIMUM_INPUT_VALUE)
    ) {
      return;
    }
    setCustomDurationDraft(value);
    clearFieldError(RESERVATION_FORM_FIELD.DURATION_HOURS);
  };
  return {
    selectCustomDuration,
    selectPreset,
    updateCustomDurationDraft,
  };
};

export const useReservationDuration = (
  updateDurationValue: (hours: number) => void,
  clearFieldError: (field: ReservationFormField) => void,
  initialCustomDurationDraft: string = STRING.Empty
) => {
  const [isCustomDuration, setIsCustomDuration] = useState(
    initialCustomDurationDraft !== STRING.Empty
  );
  const [customDurationDraft, setCustomDurationDraft] =
    useState<string>(initialCustomDurationDraft);
  const handlers = createReservationDurationHandlers(
    setCustomDurationDraft,
    setIsCustomDuration,
    updateDurationValue,
    clearFieldError
  );
  const resolveDurationHours = (
    selectedDurationHours: number
  ): number =>
    resolveReservationDurationHours(
      isCustomDuration,
      customDurationDraft,
      selectedDurationHours
    );

  return {
    ...handlers,
    customDurationDraft,
    isCustomDuration,
    resolveDurationHours,
  };
};
