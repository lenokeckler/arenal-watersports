import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationEquipmentViewModel } from "./ReservationEquipmentViewModel.interface";

export interface ReservationFormEquipmentViewModel extends ReservationEquipmentViewModel {
  categories: ReservationCategoryOption[];
  handleCategoryChange: (value: string) => void;
  handleRetryEquipmentEligibility: () => void;
  handleUnitChange: (value: string) => void;
  hasEquipmentEligibilityError: boolean;
  hasEquipmentSelectionChanged: boolean;
  isEquipmentEligibilityLoading: boolean;
}
