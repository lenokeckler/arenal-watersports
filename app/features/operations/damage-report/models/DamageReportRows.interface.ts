import type { Database, NullableRef } from "@/app/types";

export interface DamageReportUnitRow {
  category: { name: string };
  code: string;
  id: string;
  impact_count: number;
  status: Database["public"]["Enums"]["unit_status"];
}

export interface DamageReportTripRow {
  dispatch: NullableRef<{ dispatched_at: string }>;
  reservation: { customer_name: string };
  reservation_id: string;
  unit_id: NullableRef<string>;
}

export interface DamageReportOpenRow {
  unit_id: NullableRef<string>;
}
