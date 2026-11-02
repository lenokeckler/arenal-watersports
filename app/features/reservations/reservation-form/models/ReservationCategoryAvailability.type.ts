import type { Database } from "@/app/types";

export type ReservationCategoryAvailability =
  Database["public"]["Functions"]["category_availability"]["Returns"][number];
