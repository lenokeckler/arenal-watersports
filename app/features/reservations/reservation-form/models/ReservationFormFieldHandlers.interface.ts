import type { ReservationType } from "./ReservationType.type";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";

export interface ReservationFormFieldHandlers {
  handleCategoryChange: (value: string) => void;
  handleCustomerNameChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleDurationChange: (value: number) => void;
  handleExtraToggle: (extraId: string) => void;
  handleGuideToggle: (guideId: string) => void;
  handleGuideIdsChange: (guideIds: string[]) => void;
  handlePeopleCountChange: (value: number) => void;
  handleQuantityChange: (value: number) => void;
  handleReservationTypeChange: (
    value: ReservationType,
    categories?: ReservationCategoryOption[]
  ) => void;
  handleTimeChange: (value: string) => void;
  handleUnitChange: (value: string) => void;
}
