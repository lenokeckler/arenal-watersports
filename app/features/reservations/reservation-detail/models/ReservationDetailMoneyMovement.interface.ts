import type { NullableRef } from "@/app/types";
import type {
  ReservationDetailCurrency,
  ReservationDetailMovementType,
} from "../constants/ReservationDetail.constants";

export interface ReservationDetailMoneyMovement {
  amount: number;
  concept: string;
  createdAt: string;
  currency: ReservationDetailCurrency;
  id: string;
  paymentMethod: NullableRef<string>;
  recordedByName: NullableRef<string>;
  type: ReservationDetailMovementType;
}
