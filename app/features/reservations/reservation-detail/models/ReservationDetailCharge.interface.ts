import type { ReservationDetailCurrency } from "../constants/ReservationDetail.constants";
import type { NullableRef } from "@/app/types";

export interface ReservationDetailCharge {
  amountCharged: number;
  amountRemaining: NullableRef<number>;
  amountTarget: NullableRef<number>;
  currency: ReservationDetailCurrency;
}
