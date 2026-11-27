import type { NullableRef } from "@/app/types";
import type { Combo } from "./Combo.interface";
import type { ComboCardActions } from "./ComboCardActions.interface";

export interface ComboActionsViewModel extends ComboCardActions {
  comboPendingRemoval: NullableRef<Combo>;
  onCancelRemovalClick: () => void;
  onConfirmRemovalClick: () => Promise<void>;
}
