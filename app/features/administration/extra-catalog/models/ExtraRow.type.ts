import type { Database } from "@/app/types";

export type ExtraRow = Pick<
  Database["public"]["Tables"]["extras"]["Row"],
  "id" | "name" | "status"
>;
