import type { NullableRef } from "@/app/types";
import type { ReservationCategoryAvailabilityPanelState } from "./ReservationCategoryAvailabilityPanelState.type";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationCategoryConflictWarningViewModel } from "./ReservationCategoryConflictWarningViewModel.interface";

export interface ReservationEquipmentViewModel {
  availableUnits: ReservationCategoryUnitOption[];
  categoryAvailability: NullableRef<number>;
  categoryAvailabilityCategoryName: string;
  categoryAvailabilityInterval: string;
  categoryAvailabilityState: ReservationCategoryAvailabilityPanelState;
  categoryConflictWarning: ReservationCategoryConflictWarningViewModel;
  handleRetryCategoryAvailability: () => void;
  hasAvailabilityError: boolean;
  isAvailabilityLoading: boolean;
  requiresConcreteUnit: boolean;
}
