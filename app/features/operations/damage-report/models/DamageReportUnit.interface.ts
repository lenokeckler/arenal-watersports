import type { Database } from "@/app/types";
import type { DamageReportTrip } from "./DamageReportTrip.interface";

export interface DamageReportUnit {
  categoryName: string;
  code: string;
  id: string;
  impactCount: number;
  isOut: boolean;
  status: Database["public"]["Enums"]["unit_status"];
  trips: DamageReportTrip[];
}
