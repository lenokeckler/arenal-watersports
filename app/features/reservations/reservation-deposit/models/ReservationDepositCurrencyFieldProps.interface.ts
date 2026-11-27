import type { CurrencyCode } from "@/app/constants";
import type { ReservationDepositProposal } from "./ReservationDepositProposal.type";

export interface ReservationDepositCurrencyFieldProps {
  currency: CurrencyCode;
  isPending: boolean;
  onSelect: (currency: CurrencyCode) => void;
  proposal: ReservationDepositProposal;
}
