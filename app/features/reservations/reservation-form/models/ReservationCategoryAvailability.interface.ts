import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";

export interface ReservationCategoryAvailability {
  availableQuantity: number;
  availableUnits: ReservationCategoryUnitOption[];
  hasRequestedQuantity: boolean;
}
