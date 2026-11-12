import { SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkArea } from "@/app/types";

const WORK_AREAS: readonly unknown[] = Object.values(
  SUPABASE_WORK_AREA
);

export const isWorkArea = (
  value: unknown
): value is WorkArea => WORK_AREAS.includes(value);
