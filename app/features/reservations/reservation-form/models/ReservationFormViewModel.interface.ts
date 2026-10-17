import type { ReservationFormField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationFormViewModel {
  errors: Partial<Record<ReservationFormField, string>>;
  formError: string;
  isPending: boolean;
  isSubmitted: boolean;
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
  handleTimeChange: (value: string) => void;
  handleBack: () => void;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
}
