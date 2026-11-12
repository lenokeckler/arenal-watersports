import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";

export interface ReservationEditUnits {
  isCurrentUnitKept: boolean;
  offeredUnits: ReservationCategoryUnitOption[];
  retainedUnitId: string;
}
