import type { Database } from "@/app/types";

export interface UpdateCategoryRowOptions {
  categoryId: string;
  buildRow: (
    adminWorkerId: string
  ) => Database["public"]["Tables"]["equipment_categories"]["Update"];
  operation: string;
}
