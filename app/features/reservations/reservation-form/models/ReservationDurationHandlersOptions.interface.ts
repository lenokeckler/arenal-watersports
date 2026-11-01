import type { Dispatch, SetStateAction } from "react";
import type { ReservationFormField } from "./ReservationFormField.constants";

export interface ReservationDurationHandlersOptions {
  clearFieldError: (field: ReservationFormField) => void;
  clearUnitSelection: () => void;
  setCustomDurationDraft: Dispatch<SetStateAction<string>>;
  setIsCustomDuration: Dispatch<SetStateAction<boolean>>;
  updateDurationValue: (hours: number) => void;
}
