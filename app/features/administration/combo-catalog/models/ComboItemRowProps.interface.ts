import type { ComboCategoryFieldOption } from "./ComboCategoryFieldOption.interface";
import type { ComboFormFieldChangeHandler } from "./ComboFormFieldChangeHandler.type";
import type { ComboFormItemErrors } from "./ComboFormItemErrors.interface";
import type { ComboFormItemValues } from "./ComboFormItemValues.interface";

export interface ComboItemRowProps {
  categoryOptions: ComboCategoryFieldOption[];
  errors?: ComboFormItemErrors;
  index: number;
  isDisabled: boolean;
  item: ComboFormItemValues;
  onCategoryChange: ComboFormFieldChangeHandler;
  onQuantityChange: ComboFormFieldChangeHandler;
  onQuantityDecrease: () => void;
  onQuantityIncrease: () => void;
  onRemoveClick: () => void;
}
