import type { CurrencyCode } from "@/app/constants";
import type { ReservationDepositProposal } from "./ReservationDepositProposal.type";
import type { ReservationDepositValues } from "./ReservationDepositValues.interface";

export interface ReservationDepositValuesState {
  proposal: ReservationDepositProposal;
  setAmountText: (text: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setHasDeposit: (hasDeposit: boolean) => void;
  values: ReservationDepositValues;
}
