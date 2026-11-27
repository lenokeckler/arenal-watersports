import type { CurrencyCode } from "@/app/constants";

export type ReservationDepositProposal = Record<
  CurrencyCode,
  number
>;
