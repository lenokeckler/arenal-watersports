import type { Database, NullableRef } from "@/app/types";

export interface PendingDamageReport {
  cause: NullableRef<
    Database["public"]["Enums"]["damage_cause"]
  >;
  description: string;
  hasTrip: boolean;
  hits: number;
  id: string;
  unitId: string;
}
