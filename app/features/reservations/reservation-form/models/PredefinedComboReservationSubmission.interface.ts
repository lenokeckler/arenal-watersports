import type { NullableRef } from "@/app/types";
import type { PredefinedComboSelectionMode } from "./PredefinedComboSelectionMode.type";

export interface PredefinedComboReservationSubmission {
  mode: PredefinedComboSelectionMode;
  selectedComboId: NullableRef<string>;
}
