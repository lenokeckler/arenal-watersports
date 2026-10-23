import type { NullableRef } from "@/app/types";
import type { ReservationFormField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { ReservationType } from "./ReservationType.type";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationCategoryAvailabilityPanelState } from "./ReservationCategoryAvailabilityPanelState.type";
import type { ReservationCategoryConflictWarningViewModel } from "./ReservationCategoryConflictWarningViewModel.interface";
import type { CustomComboFormViewModel } from "./CustomComboFormViewModel.interface";
import type { PredefinedComboFormViewModel } from "./PredefinedComboFormViewModel.interface";

export interface ReservationFormViewModel {
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
  values: ReservationFormInput;
  customCombo: CustomComboFormViewModel;
  predefinedCombo: PredefinedComboFormViewModel;
  handleCustomerNameChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleDurationChange: (value: number) => void;
  handleCustomDurationChange: (value: string) => void;
  handleCustomDurationSelection: () => void;
  handlePeopleCountChange: (value: number) => void;
  handleQuantityChange: (value: number) => void;
  handleReservationTypeChange: (
    value: ReservationType
  ) => void;
  handleGuideToggle: (guideId: string) => void;
  handleExtraToggle: (extraId: string) => void;
  handleCategoryChange: (value: string) => void;
  handleTimeChange: (value: string) => void;
  handleUnitChange: (value: string) => void;
  handleBack: () => void;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  handleRetryEquipmentEligibility: () => void;
  handleRetryCategoryAvailability: () => void;
}
