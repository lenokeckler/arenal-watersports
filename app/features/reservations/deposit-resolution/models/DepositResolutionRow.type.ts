import type { Database, NullableRef } from "@/app/types";

export type DepositResolutionRow = Pick<
  Database["public"]["Tables"]["deposits"]["Row"],
  "amount" | "currency" | "id" | "status"
> & {
  reservation: NullableRef<
    Pick<
      Database["public"]["Tables"]["reservations"]["Row"],
      "code" | "customer_name" | "id" | "status"
    >
  >;
};
