import type { ReservationStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationChargeProposal } from "./ReservationChargeProposal.type";

export interface ReservationCharge {
  code: string;
  customerName: string;
  date: string;
  durationMinutes: number;
  id: string;
  parentReservationId: NullableRef<string>;
  peopleCount: number;
  proposal: ReservationChargeProposal;
  status: ReservationStatus;
  time: string;
}
