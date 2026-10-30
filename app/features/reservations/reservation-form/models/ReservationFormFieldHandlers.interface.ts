import type { ReservationType } from "./ReservationType.type";

export interface ReservationFormFieldHandlers {
  handleCategoryChange: (value: string) => void;
  handleCustomerNameChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleDurationChange: (value: number) => void;
  handlePeopleCountChange: (value: number) => void;
  handleQuantityChange: (value: number) => void;
  handleReservationTypeChange: (
    value: ReservationType
  ) => void;
  handleTimeChange: (value: string) => void;
  handleUnitChange: (value: string) => void;
}
