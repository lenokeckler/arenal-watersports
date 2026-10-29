import type { WorkArea } from "@/app/types";
import { SUPABASE_WORK_AREA } from "../supabase/SupabaseWorkArea.constants";

export const WORK_AREA_LABEL: Record<WorkArea, string> = {
  [SUPABASE_WORK_AREA.ADMINISTRATION]: "Administración",
  [SUPABASE_WORK_AREA.OPERATIONS]: "Operaciones",
  [SUPABASE_WORK_AREA.RESERVATIONS]: "Reservas",
};
