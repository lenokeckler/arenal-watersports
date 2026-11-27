import type { ReservationCategoryConflict } from "./ReservationCategoryConflict.type";

export interface CustomComboConflictLookupState {
  key: string;
  conflicts: ReservationCategoryConflict[];
  hasError: boolean;
  isLoading: boolean;
}
