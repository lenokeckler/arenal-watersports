import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationEquipmentViewModel } from "./ReservationEquipmentViewModel.interface";

export interface ReservationFormEquipmentSelectionProps {
  categories: ReservationCategoryOption[];
  categoryId: string;
  equipment: ReservationEquipmentViewModel;
  handleCategoryChange: (value: string) => void;
  handleUnitChange: (value: string) => void;
  hasEligibilityError: boolean;
  isEligibilityLoading: boolean;
  unitId: string;
}
