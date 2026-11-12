import type { NullableRef } from "@/app/types";
import { CUSTOM_COMBO_DRAFT_ACTION } from "../constants/CustomComboDraftAction.constants";
import type { CustomComboEquipmentSelection } from "./CustomComboEquipmentSelection.interface";

export type CustomComboDraftAction =
  | {
      type: typeof CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_CRC_CHANGE;
      value: NullableRef<number>;
    }
  | {
      type: typeof CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_USD_CHANGE;
      value: NullableRef<number>;
    }
  | {
      type: typeof CUSTOM_COMBO_DRAFT_ACTION.ITEM_CHANGE;
      selection: CustomComboEquipmentSelection;
    }
  | {
      type: typeof CUSTOM_COMBO_DRAFT_ACTION.ITEM_REMOVAL;
      categoryId: string;
    };
