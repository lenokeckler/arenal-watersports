import type { Database } from "@/app/types";

export interface OilRemainingProps {
  metric: Database["public"]["Enums"]["usage_metric"];
  remaining: number;
}
