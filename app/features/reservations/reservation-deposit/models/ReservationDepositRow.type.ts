import type { Database, NullableRef } from "@/app/types";

export type ReservationDepositRow = Pick<
  Database["public"]["Tables"]["reservations"]["Row"],
  | "code"
  | "customer_name"
  | "id"
  | "parent_reservation_id"
  | "starts_at"
  | "status"
> & {
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
};
