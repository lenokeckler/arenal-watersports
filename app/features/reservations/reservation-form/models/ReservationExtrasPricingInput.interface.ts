import type { ReservationExtrasPricingType } from "./ReservationExtrasPricingType.type";

export interface ReservationExtrasPricingInput {
  durationHours: number;
  extraIds: string[];
  reservationType: ReservationExtrasPricingType;
  unitId: string;
}
