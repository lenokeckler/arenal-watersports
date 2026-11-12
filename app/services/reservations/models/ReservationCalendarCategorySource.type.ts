import type { Database } from "@/app/types";

export type ReservationCalendarCategorySource = Pick<
  Database["public"]["Tables"]["equipment_categories"]["Row"],
  "id" | "name"
>;
