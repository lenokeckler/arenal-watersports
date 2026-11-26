import type { ReservationStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationDepositDecision } from "@/app/utils/reservations/models/ReservationDepositDecision.type";
import type { ReservationDepositProposal } from "./ReservationDepositProposal.type";

export interface ReservationDeposit {
  code: string;
  customerName: string;
  date: string;
  decision: ReservationDepositDecision;
  id: string;
  parentReservationId: NullableRef<string>;
  proposal: ReservationDepositProposal;
  status: ReservationStatus;
  time: string;
}
