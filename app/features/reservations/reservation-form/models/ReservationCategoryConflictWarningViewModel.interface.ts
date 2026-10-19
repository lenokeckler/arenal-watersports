import type { ReservationCategoryConflictWarningItem } from "./ReservationCategoryConflictWarningItem.interface";

export interface ReservationCategoryConflictWarningViewModel {
  hasError: boolean;
  isLoading: boolean;
  items: ReservationCategoryConflictWarningItem[];
}
