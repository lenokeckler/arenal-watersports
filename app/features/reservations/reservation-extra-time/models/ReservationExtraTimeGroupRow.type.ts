import type { Database, NullableRef } from "@/app/types";

type GeneratedGroupRow =
  Database["public"]["Functions"]["reservation_extra_time_groups"]["Returns"][number];

export type ReservationExtraTimeGroupRow = Omit<
  GeneratedGroupRow,
  "arrived_at"
> & {
  arrived_at: NullableRef<string>;
};
