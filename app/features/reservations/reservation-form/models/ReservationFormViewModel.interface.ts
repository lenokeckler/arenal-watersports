import type { ReservationFormField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { NullableRef } from "@/app/types";

export interface ReservationFormViewModel {
  categories: ReservationCategoryOption[];
  errors: Partial<Record<ReservationFormField, string>>;
  formError: string;
  isPending: boolean;
  isSubmitted: boolean;
  availableUnits: ReservationCategoryUnitOption[];
  availableQuantity: NullableRef<number>;
  requiresConcreteUnit: boolean;
  isAvailabilityLoading: boolean;
  hasAvailabilityError: boolean;
  isSubmitDisabled: boolean;
  isCustomDuration: boolean;
  customDurationDraft: string;
  values: ReservationFormInput;
  handleCustomerNameChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleDurationChange: (value: number) => void;
  handleCustomDurationChange: (value: string) => void;
  handleCustomDurationSelection: () => void;
  handlePeopleCountChange: (value: number) => void;
  handleQuantityChange: (value: number) => void;
  handleCategoryChange: (value: string) => void;
  handleUnitChange: (value: string) => void;
  retryUnitAvailability: () => void;
  isEquipmentEligibilityLoading: boolean;
  hasEquipmentEligibilityError: boolean;
  hasEquipmentSelectionChanged: boolean;
  handleRetryEquipmentEligibility: () => void;
  handleTimeChange: (value: string) => void;
  handleBack: () => void;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
}
