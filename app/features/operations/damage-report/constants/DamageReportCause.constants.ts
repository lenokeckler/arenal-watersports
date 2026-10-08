import type { Database } from "@/app/types";

export const DAMAGE_REPORT_CAUSES: Array<{
  key: Database["public"]["Enums"]["damage_cause"];
  value: Database["public"]["Enums"]["damage_cause"];
  label: string;
}> = [
  {
    key: "rollover",
    value: "rollover",
    label: "Vuelco",
  },
  {
    key: "collision",
    value: "collision",
    label: "Choque",
  },
  {
    key: "machine_failure",
    value: "machine_failure",
    label: "Falla de máquina",
  },
  {
    key: "other",
    value: "other",
    label: "Otra",
  },
];
