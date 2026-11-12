import type {
  CurrencyCode,
  DepositStatus,
} from "@/app/constants";
import type { DepositReservation } from "./DepositReservation.interface";

export interface RetainedDepositItem {
  id: string;
  currency: CurrencyCode;
  status: DepositStatus;
  retainedAmount: number;
  retentionReason: string;
  reservation: DepositReservation;
}
