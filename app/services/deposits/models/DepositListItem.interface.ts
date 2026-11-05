import type {
  CurrencyCode,
  DepositStatus,
} from "@/app/constants";
import type { DepositReservation } from "./DepositReservation.interface";

export interface DepositListItem {
  id: string;
  amount: number;
  currency: CurrencyCode;
  status: DepositStatus;
  reservation: DepositReservation;
}
