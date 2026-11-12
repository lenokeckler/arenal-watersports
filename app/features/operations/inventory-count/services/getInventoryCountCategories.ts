import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_COUNT_QUERY } from "../constants/InventoryCount.constants";
import type { InventoryCountCategory } from "../models/InventoryCountCategory.type";
import { mapInventoryCountCategories } from "../utils/mapInventoryCountCategories";

export const getInventoryCountCategories =
  async (): Promise<InventoryCountCategory[]> => {
    const supabase = await requireInventoryAccess();
    const { data, error } = await supabase
      .from("equipment_categories")
      .select(
        "id, name, tracking_mode, units:equipment_units(id, code, status), stock:equipment_stock(quantity_available, quantity_damaged, quantity_in_repair)"
      )
      .eq("status", "active")
      .order("name");

    throwIfSupabaseError(
      error,
      INVENTORY_COUNT_QUERY.CATEGORIES
    );

    return mapInventoryCountCategories(data ?? []);
  };
