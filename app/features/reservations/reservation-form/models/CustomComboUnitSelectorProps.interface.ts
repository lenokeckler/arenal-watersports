import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";

export interface CustomComboUnitSelectorProps {
  categoryId: string;
  categoryName: string;
  availableUnits: ReservationCategoryUnitOption[];
  hasError: boolean;
  isLoading: boolean;
  isScheduleValid: boolean;
  selectedUnitId: string;
  onChange: (unitId: string) => void;
}
