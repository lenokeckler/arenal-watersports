import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { ComboForEdit } from "../models/ComboForEdit.interface";
import type { ComboFormValues } from "../models/ComboFormValues.interface";

export const mapComboToFormValues = ({
  audience,
  items,
  name,
  packagePrice,
}: ComboForEdit): ComboFormValues => ({
  audience,
  items: items.map((item) => ({
    categoryId: item.categoryId,
    quantityText: item.quantity.toString(),
  })),
  name,
  priceText: safeString(packagePrice?.toString()),
});
