import type {
  CurrencyCode,
  ReservationStatus,
} from "@/app/constants";
import type { Database } from "@/app/types";

export interface DepositResolution {
  amount: number;
  code: string;
  currency: CurrencyCode;
  customerName: string;
  id: string;
  reservationId: string;
  reservationStatus: ReservationStatus;
  status: Database["public"]["Enums"]["deposit_status"];
}
