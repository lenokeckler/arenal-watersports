import type { NullableRef } from "@/app/types";
import type { ReservationChargePartRow } from "./ReservationChargePartRow.interface";

export interface ReservationChargeParts {
  agreedAmountCrc: NullableRef<number>;
  agreedAmountUsd: NullableRef<number>;
  charges: readonly ReservationChargePartRow[];
  pricingRows: number;
}
