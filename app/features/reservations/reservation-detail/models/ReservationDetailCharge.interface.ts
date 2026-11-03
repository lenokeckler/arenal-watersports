import type { ReservationDetailCurrency } from "../constants/ReservationDetail.constants";
import type { NullableRef } from "@/app/types";

export interface ReservationDetailCharge {
  amountChargedGross: number;
  amountChargedNet: number;
  amountCredit: NullableRef<number>;
  amountRemaining: NullableRef<number>;
  amountTarget: NullableRef<number>;
  currency: ReservationDetailCurrency;
}
