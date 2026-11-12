import type { Dispatch, SetStateAction } from "react";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";

export interface ReservationEquipmentSelectionReconciliationOptions {
  availableUnits: ReservationCategoryUnitOption[];
  categories: ReservationCategoryOption[];
  handleCategoryChange: (value: string) => void;
  handleUnitChange: (value: string) => void;
  isAvailabilityResolved: boolean;
  isEligibilityError: boolean;
  isEligibilityLoading: boolean;
  selectedCategoryId: string;
  selectedUnitId: string;
  setHasSelectionChanged: Dispatch<SetStateAction<boolean>>;
}
