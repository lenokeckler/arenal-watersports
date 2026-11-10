import type { Database } from "@/app/types/Database";

export const SUPABASE_WORKER_MARK = {
  EXTERNAL_GUIDE_REGISTRATION: "registro_guias_externos",
  GENERAL_MANAGER: "encargado_general",
  GUIDE: "guia",
} as const satisfies Record<
  string,
  Database["public"]["Enums"]["worker_mark"]
>;

export type WorkerMark =
  Database["public"]["Enums"]["worker_mark"];
