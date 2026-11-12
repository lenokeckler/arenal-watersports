import type { NullableRef } from "@/app/types";

export interface ReservationExtraOption {
  id: string;
  name: string;
  priceCrc: NullableRef<number>;
  priceUsd: NullableRef<number>;
  occupiesCategoryId: NullableRef<string>;
  occupiesQuantity: NullableRef<number>;
}
