import type { Database, NullableRef } from "@/app/types";
import type { DamageReportUnitStatus } from "./DamageReportUnitStatus.type";

export interface DamageReportInput {
  cause: NullableRef<
    Database["public"]["Enums"]["damage_cause"]
  >;
  description: string;
  detailLater: boolean;
  hits: number;
  reportId: NullableRef<string>;
  reservationId: NullableRef<string>;
  unitId: string;
  unitStatus: NullableRef<DamageReportUnitStatus>;
}
