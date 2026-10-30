import type { Database } from "@/app/types";

export type ReservationDetailWorkerName =
  Database["public"]["Functions"]["worker_display_names"]["Returns"][number];
