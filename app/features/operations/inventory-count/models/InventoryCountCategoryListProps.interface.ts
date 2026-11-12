import type { InventoryCountCategory } from "./InventoryCountCategory.type";
import type { InventoryCountForm } from "./InventoryCountForm.interface";

export interface InventoryCountCategoryListProps {
  categories: InventoryCountCategory[];
  form: InventoryCountForm;
}
