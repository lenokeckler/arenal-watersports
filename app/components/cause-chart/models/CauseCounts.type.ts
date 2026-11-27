import type { Database } from "@/app/types";

export type CauseCounts = Record<
  Database["public"]["Enums"]["damage_cause"],
  number
>;
