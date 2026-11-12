import type { Json } from "@/app/types/database.types";
import type { InventoryCountLine } from "../models/InventoryCountInput.interface";

export const toInventoryCountPayload = (
  lines: InventoryCountLine[]
): Json =>
  lines.map((line) =>
    "unitId" in line
      ? {
          category_id: line.categoryId,
          confirmed_status: line.confirmedStatus,
          unit_id: line.unitId,
        }
      : {
          category_id: line.categoryId,
          quantity_available: line.quantities.available,
          quantity_damaged: line.quantities.damaged,
          quantity_in_repair: line.quantities.inRepair,
        }
  );
