import type { NullableRef } from "@/app/types";
import type { CustomComboEquipmentSelection } from "./CustomComboEquipmentSelection.interface";
import type { CustomComboPricingState } from "./CustomComboPricingState.type";
import type { CustomComboReservationDraft } from "./CustomComboReservationDraft.interface";
import type { ReservationCategoryConflictWarningViewModel } from "./ReservationCategoryConflictWarningViewModel.interface";

export interface CustomComboFormViewModel {
  draft: CustomComboReservationDraft;
  extraUnitId: string;
  hasGuideOnlyItem: boolean;
  pricing: CustomComboPricingState;
  conflictWarning: ReservationCategoryConflictWarningViewModel;
  reset: () => void;
  handleAgreedAmountCrcChange: (
    value: NullableRef<number>
  ) => void;
  handleAgreedAmountUsdChange: (
    value: NullableRef<number>
  ) => void;
  handleItemChange: (
    selection: CustomComboEquipmentSelection
  ) => void;
  handleItemQuantityChange: (
    categoryId: string,
    quantity: number
  ) => void;
  handleItemUnitChange: (
    categoryId: string,
    unitId: string
  ) => void;
  handleItemRemoval: (categoryId: string) => void;
  handleExtraToggle: (
    unitId: string,
    extraId: string
  ) => void;
  handlePricingRetry: () => void;
}
