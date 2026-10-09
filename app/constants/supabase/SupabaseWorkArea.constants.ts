import type { Database } from "@/app/types/Database";

export const SUPABASE_WORK_AREA = {
  ADMINISTRATION: "administracion",
} as const satisfies Record<
  string,
  Database["public"]["Enums"]["work_area"]
>;
