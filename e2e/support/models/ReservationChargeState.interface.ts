import type { NullableRef } from "@/app/types";

export interface ReservationChargeState {
  agreedAmountCrc: NullableRef<number>;
  agreedAmountUsd: NullableRef<number>;
  amount: number;
  charges: number;
  currency: string;
  isAuthor: boolean;
  kind: string;
  method: string;
  pricingRows: number;
  recordedByName: string;
}
