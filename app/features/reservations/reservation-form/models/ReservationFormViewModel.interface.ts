import type { NullableRef } from "@/app/types";
import type { ReservationFormErrorField } from "./ReservationFormField.constants";
import type { CustomComboFormViewModel } from "./CustomComboFormViewModel.interface";
import type { PredefinedComboFormViewModel } from "./PredefinedComboFormViewModel.interface";
import type { ReservationExtrasViewModel } from "./ReservationExtrasViewModel.interface";
import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationCategoryAvailabilityPanelState } from "./ReservationCategoryAvailabilityPanelState.type";
import type { ReservationCategoryConflictWarningViewModel } from "./ReservationCategoryConflictWarningViewModel.interface";
import type { ReservationType } from "./ReservationType.type";

export interface ReservationFormViewModel {
  categories: ReservationCategoryOption[];
  errors: Partial<
    Record<ReservationFormErrorField, string>
  >;
  customCombo?: CustomComboFormViewModel;
  predefinedCombo?: PredefinedComboFormViewModel;
  extras?: ReservationExtrasViewModel;
  resolvedDurationHours?: number;
  formError: string;
  isPending: boolean;
  isSubmitted: boolean;
  availableUnits: ReservationCategoryUnitOption[];
  availableQuantity: NullableRef<number>;
  requiresConcreteUnit: boolean;
  isAvailabilityLoading: boolean;
  hasAvailabilityError: boolean;
  categoryAvailability: NullableRef<number>;
  categoryAvailabilityCategoryName: string;
  categoryAvailabilityInterval: string;
  categoryAvailabilityState: ReservationCategoryAvailabilityPanelState;
  categoryConflictWarning: ReservationCategoryConflictWarningViewModel;
  isSubmitDisabled: boolean;
  isCustomDuration: boolean;
  customDurationDraft: string;
  values: ReservationFormInput;
  handleCustomerNameChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleDurationChange: (value: number) => void;
  handleGuideToggle: (guideId: string) => void;
  handleCustomDurationChange: (value: string) => void;
  handleCustomDurationSelection: () => void;
  handlePeopleCountChange: (value: number) => void;
  handleQuantityChange: (value: number) => void;
  handleCategoryChange: (value: string) => void;
  handleReservationTypeChange: (
    value: ReservationType
  ) => void;
  handleExtraToggle: (extraId: string) => void;
  handleUnitChange: (value: string) => void;
  retryUnitAvailability: () => void;
  isEquipmentEligibilityLoading: boolean;
  hasEquipmentEligibilityError: boolean;
  hasEquipmentSelectionChanged: boolean;
  hasReservationTypeSelectionReset: boolean;
  handleRetryEquipmentEligibility: () => void;
  handleTimeChange: (value: string) => void;
  handleBack: () => void;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  handleRetryCategoryAvailability: () => void;
}
