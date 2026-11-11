import type { Dispatch, SetStateAction } from "react";
import type { NullableRef } from "@/app/types";
import type { PredefinedComboSelectionMode } from "./PredefinedComboSelectionMode.type";
import type { ReservationPredefinedCombo } from "./ReservationPredefinedCombo.interface";

export interface PredefinedComboSelectionHandlersInput {
  combos: ReservationPredefinedCombo[];
  isComboReservation: boolean;
  mode: PredefinedComboSelectionMode;
  onGuideIdsChange: (guideIds: string[]) => void;
  selectedCombo: NullableRef<ReservationPredefinedCombo>;
  setMode: Dispatch<
    SetStateAction<PredefinedComboSelectionMode>
  >;
  setSelectedComboId: Dispatch<
    SetStateAction<NullableRef<string>>
  >;
}
