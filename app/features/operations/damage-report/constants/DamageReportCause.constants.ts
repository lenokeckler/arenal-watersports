import type { Database } from "@/app/types";
import { DAMAGE_REPORT_COPY } from "./DamageReportCopy.constants";

export const DAMAGE_REPORT_CAUSES: Array<{
  key: Database["public"]["Enums"]["damage_cause"];
  value: Database["public"]["Enums"]["damage_cause"];
  label: string;
}> = [
  {
    key: "rollover",
    value: "rollover",
    label: DAMAGE_REPORT_COPY.CAUSES.ROLLOVER,
  },
  {
    key: "collision",
    value: "collision",
    label: DAMAGE_REPORT_COPY.CAUSES.COLLISION,
  },
  {
    key: "machine_failure",
    value: "machine_failure",
    label: DAMAGE_REPORT_COPY.CAUSES.MACHINE_FAILURE,
  },
  {
    key: "other",
    value: "other",
    label: DAMAGE_REPORT_COPY.CAUSES.OTHER,
  },
];
