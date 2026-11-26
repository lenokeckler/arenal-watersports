import type { NullableRef } from "@/app/types";
import type { Combo } from "./Combo.interface";

export interface ComboCardActions {
  onReactivateClick: (
    comboId: string
  ) => () => Promise<void>;
  onRemoveClick: (combo: Combo) => () => void;
  pendingComboId: NullableRef<string>;
}
