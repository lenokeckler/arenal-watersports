import type { Database, NullableRef } from "@/app/types";

export interface DamageReportFormValues {
  unitId: string;
  cause: NullableRef<
    Database["public"]["Enums"]["damage_cause"]
  >;
  description: string;
  impactDelta: number;
}
