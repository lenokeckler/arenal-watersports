import type { ReservationStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationExtraTimeGroup } from "./ReservationExtraTimeGroup.interface";
import type { ReservationExtraTimeResolution } from "./ReservationExtraTimeResolution.interface";

export interface ReservationExtraTime {
  code: string;
  customerName: string;
  groups: readonly ReservationExtraTimeGroup[];
  id: string;
  resolution: NullableRef<ReservationExtraTimeResolution>;
  status: ReservationStatus;
  totalMinutes: number;
}
