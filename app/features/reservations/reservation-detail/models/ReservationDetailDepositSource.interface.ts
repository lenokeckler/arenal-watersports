import type { Database, NullableRef } from "@/app/types";

export interface ReservationDetailDepositSource {
  deposit_declination: NullableRef<
    Pick<
      Database["public"]["Tables"]["deposit_declinations"]["Row"],
      "reservation_id"
    >
  >;
  deposits: Pick<
    Database["public"]["Tables"]["deposits"]["Row"],
    "amount" | "currency"
  >[];
}
