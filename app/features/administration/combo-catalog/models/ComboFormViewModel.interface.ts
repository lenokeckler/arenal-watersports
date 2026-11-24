import type { ComboAudience } from "./ComboAudience.type";
import type { ComboCategoryFieldOption } from "./ComboCategoryFieldOption.interface";
import type { ComboFormFieldChangeHandler } from "./ComboFormFieldChangeHandler.type";
import type { ComboFormSubmitViewModel } from "./ComboFormSubmitViewModel.interface";
import type { ComboFormValues } from "./ComboFormValues.interface";
import type { ComboPriceField } from "./ComboPriceField.interface";

export interface ComboFormViewModel extends ComboFormSubmitViewModel {
  categoryFieldOptions: ComboCategoryFieldOption[];
  isAudienceLocked: boolean;
  onAddItem: () => void;
  onAudienceSelect: (audience: ComboAudience) => () => void;
  onBack: () => void;
  onItemCategoryChange: (
    index: number
  ) => ComboFormFieldChangeHandler;
  onItemQuantityChange: (
    index: number
  ) => ComboFormFieldChangeHandler;
  onNameChange: ComboFormFieldChangeHandler;
  onPriceChange: ComboFormFieldChangeHandler;
  onRemoveItem: (index: number) => () => void;
  priceField: ComboPriceField;
  title: string;
  values: ComboFormValues;
}
