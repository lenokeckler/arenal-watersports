import type { Database } from "@/app/types";

export type ReservationCalendarGuideSource = Pick<
  Database["public"]["Tables"]["workers"]["Row"],
  "full_name" | "is_external_guide"
>;
