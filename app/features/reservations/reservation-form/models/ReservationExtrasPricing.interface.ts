import type { NullableRef } from "@/app/types";

export interface ReservationExtrasPricing {
  hasBoatTariff: boolean;
  listAmountCrc: NullableRef<number>;
  listAmountUsd: NullableRef<number>;
}
