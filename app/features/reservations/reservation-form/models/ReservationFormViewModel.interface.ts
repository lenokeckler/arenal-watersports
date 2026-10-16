import type { ReservationFormField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationFormViewModel {
  errors: Partial<Record<ReservationFormField, string>>;
  formError: string;
  isPending: boolean;
  isSubmitted: boolean;
  values: ReservationFormInput;
  handleCustomerNameChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleDurationChange: (value: number) => void;
  handlePeopleCountChange: (value: number) => void;
  handleQuantityChange: (value: number) => void;
  handleCategoryChange: (value: string) => void;
  handleTimeChange: (value: string) => void;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
}
