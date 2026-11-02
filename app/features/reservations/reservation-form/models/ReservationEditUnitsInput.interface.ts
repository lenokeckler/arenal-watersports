import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationEdit } from "./ReservationEdit.interface";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationEditUnitsInput {
  availableUnits: ReservationCategoryUnitOption[];
  durationHours: number;
  isLookupSettled: boolean;
  reservation: ReservationEdit;
  values: ReservationFormInput;
}
