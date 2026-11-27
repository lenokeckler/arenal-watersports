import type { Database } from "@/app/types";

export const DAMAGE_CAUSE_ORDER = [
  "rollover",
  "collision",
  "machine_failure",
  "other",
] as const satisfies readonly Database["public"]["Enums"]["damage_cause"][];

export const DAMAGE_CAUSE_LABELS: Record<
  Database["public"]["Enums"]["damage_cause"],
  string
> = {
  collision: "Choque",
  machine_failure: "Falla de máquina",
  other: "Otra",
  rollover: "Vuelco",
};

export const DAMAGE_PENDING_LABEL = "Daño por completar";
