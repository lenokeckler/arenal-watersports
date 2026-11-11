import type { NullableRef } from "@/app/types";
import type { ReservationCategoryAvailabilityPanelState } from "./ReservationCategoryAvailabilityPanelState.type";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationCategoryConflictWarningViewModel } from "./ReservationCategoryConflictWarningViewModel.interface";

export interface ReservationEquipmentViewModel {
  availableQuantity: NullableRef<number>;
  availableUnits: ReservationCategoryUnitOption[];
  categoryAvailability: NullableRef<number>;
  categoryAvailabilityCategoryName: string;
  categoryAvailabilityInterval: string;
  categoryAvailabilityState: ReservationCategoryAvailabilityPanelState;
  categoryConflictWarning: ReservationCategoryConflictWarningViewModel;
  handleRetryCategoryAvailability: () => void;
  hasAvailabilityError: boolean;
  isAvailabilityResolved: boolean;
  isAvailabilityLoading: boolean;
  requiresConcreteUnit: boolean;
  retryUnitAvailability: () => void;
}
