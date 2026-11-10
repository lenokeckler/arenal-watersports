import type { ReservationCategoryUnitOption } from "../../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitCommitment } from "../../models/ReservationUnitCommitment.interface";
import type { ReservationAvailabilityClientOptions } from "./ReservationAvailabilityClientOptions.interface";

export interface ReservationAvailabilityClientState {
  commitments: ReservationUnitCommitment[];
  options: ReservationAvailabilityClientOptions;
  units: ReservationCategoryUnitOption[];
}
