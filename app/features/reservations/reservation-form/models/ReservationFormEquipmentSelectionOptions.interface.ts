import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";

export interface ReservationFormEquipmentSelectionOptions {
  availableUnits: ReservationCategoryUnitOption[];
  categories: ReservationCategoryOption[];
  isAvailabilityResolved: boolean;
  isEligibilityError: boolean;
  isEligibilityLoading: boolean;
  selectedCategoryId: string;
  selectedUnitId: string;
  onCategoryChange: (value: string) => void;
  onUnitChange: (value: string) => void;
}
