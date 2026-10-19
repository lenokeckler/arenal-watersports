import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";

export interface ReservationEquipmentSelectionSyncProps {
  availableUnits: ReservationCategoryUnitOption[];
  categories: ReservationCategoryOption[];
  categoryId: string;
  hasAvailabilityError: boolean;
  isAvailabilityLoading: boolean;
  isEligibilityLoading: boolean;
  hasEligibilityError: boolean;
  onCategoryChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  setHasSelectionChanged: (value: boolean) => void;
  unitId: string;
}
