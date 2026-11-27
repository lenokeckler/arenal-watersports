import type { Database, NullableRef } from "@/app/types";
import type { DAMAGE_REPORT_STATE } from "../constants/DamageReport.constants";

export interface DamageReportDraft {
  cause: NullableRef<
    Database["public"]["Enums"]["damage_cause"]
  >;
  description: string;
  hits: number;
  reservationId: string;
  state: (typeof DAMAGE_REPORT_STATE)[keyof typeof DAMAGE_REPORT_STATE];
  unitId: string;
}
