import { parseMoneyAmount } from "@/app/utils/money/parseMoneyAmount";
import { safeNumber } from "@/app/utils/safe-value/SafeValue";
import type { ComboFormValues } from "../models/ComboFormValues.interface";
import type { SaveComboInput } from "../models/SaveComboInput.type";

export const mapComboFormValuesToPayload = (
  values: ComboFormValues,
  comboId?: string
): SaveComboInput => ({
  audience: values.audience,
  ...(comboId ? { combo_id: comboId } : {}),
  items: values.items.map((item) => ({
    category_id: item.categoryId,
    quantity: Number(item.quantityText.trim()),
  })),
  name: values.name.trim(),
  package_price: safeNumber(
    parseMoneyAmount(values.priceText)
  ),
});
