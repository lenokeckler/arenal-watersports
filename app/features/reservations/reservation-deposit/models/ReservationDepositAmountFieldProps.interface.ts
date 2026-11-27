import type { CurrencyCode } from "@/app/constants";
import type { ReservationDepositProposal } from "./ReservationDepositProposal.type";

export interface ReservationDepositAmountFieldProps {
  amountText: string;
  currency: CurrencyCode;
  error?: string;
  isPending: boolean;
  onChange: (text: string) => void;
  proposal: ReservationDepositProposal;
}
