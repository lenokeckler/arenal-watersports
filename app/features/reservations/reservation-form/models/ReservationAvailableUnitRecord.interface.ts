import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";

export interface ReservationAvailableUnitRecord extends ReservationCategoryUnitOption {
  categoryId: string;
}
