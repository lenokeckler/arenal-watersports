import type { NullableRef } from "@/app/types";
import type { ReservationFormField } from "./ReservationFormField.constants";
import type { ReservationFormFieldsViewModel } from "./ReservationFormFieldsViewModel.interface";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationCategoryAvailabilityPanelState } from "./ReservationCategoryAvailabilityPanelState.type";
import type { ReservationCategoryConflictWarningViewModel } from "./ReservationCategoryConflictWarningViewModel.interface";

export interface ReservationFormViewModel extends ReservationFormFieldsViewModel {
  errors: Partial<Record<ReservationFormField, string>>;
  categories: ReservationCategoryOption[];
  hasEquipmentEligibilityError: boolean;
  hasEquipmentSelectionChanged: boolean;
  isEquipmentEligibilityLoading: boolean;
  formError: string;
  isPending: boolean;
  isSubmitted: boolean;
  availableUnits: ReservationCategoryUnitOption[];
  requiresConcreteUnit: boolean;
  isAvailabilityLoading: boolean;
  hasAvailabilityError: boolean;
  categoryAvailability: NullableRef<number>;
  categoryAvailabilityCategoryName: string;
  categoryAvailabilityInterval: string;
  categoryAvailabilityState: ReservationCategoryAvailabilityPanelState;
  categoryConflictWarning: ReservationCategoryConflictWarningViewModel;
  isCustomDuration: boolean;
  customDurationDraft: string;
  handleCustomDurationChange: (value: string) => void;
  handleCustomDurationSelection: () => void;
  handleBack: () => void;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  handleRetryEquipmentEligibility: () => void;
  handleRetryCategoryAvailability: () => void;
}
