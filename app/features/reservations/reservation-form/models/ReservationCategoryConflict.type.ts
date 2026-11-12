import type { Database } from "@/app/types";

export type ReservationCategoryConflict =
  Database["public"]["Functions"]["reservation_category_conflicts"]["Returns"][number];
