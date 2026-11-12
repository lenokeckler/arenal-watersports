import type { InventoryCountForm } from "./InventoryCountForm.interface";
import type { InventoryCountCategory } from "./InventoryCountCategory.type";

export interface InventoryCountCategorySectionProps {
  category: InventoryCountCategory;
  form: InventoryCountForm;
}
