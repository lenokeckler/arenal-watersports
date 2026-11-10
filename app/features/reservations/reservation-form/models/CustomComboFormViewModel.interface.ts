import type { NullableRef } from "@/app/types";
import type { CustomComboEquipmentSelection } from "./CustomComboEquipmentSelection.interface";
import type { CustomComboPricingState } from "./CustomComboPricingState.type";
import type { CustomComboReservationDraft } from "./CustomComboReservationDraft.interface";

export interface CustomComboFormViewModel {
  draft: CustomComboReservationDraft;
  hasGuideOnlyItem: boolean;
  pricing: CustomComboPricingState;
  handleAgreedAmountCrcChange: (
    value: NullableRef<number>
  ) => void;
  handleAgreedAmountUsdChange: (
    value: NullableRef<number>
  ) => void;
  handleItemChange: (
    selection: CustomComboEquipmentSelection
  ) => void;
  handleItemRemoval: (categoryId: string) => void;
  handlePricingRetry: () => void;
}
