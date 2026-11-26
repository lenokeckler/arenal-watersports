import type { Database } from "@/app/types";

export type ReservationDepositProposalRow =
  Database["public"]["Functions"]["reservation_deposit_proposal"]["Returns"][number];
