import type { Database } from "@/app/types";

export type ReservationExtraTimeResolutionRow = Pick<
  Database["public"]["Tables"]["reservation_extra_time_resolutions"]["Row"],
  "extra_minutes" | "outcome"
>;
