import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import type { PredefinedComboSelectionMode } from "../models/PredefinedComboSelectionMode.type";
import type { PredefinedComboFormViewModel } from "../models/PredefinedComboFormViewModel.interface";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import { createPredefinedComboSelectionHandlers } from "../utils/createPredefinedComboSelectionHandlers";

export const usePredefinedComboForm = (
  combos: ReservationPredefinedCombo[],
  isComboReservation: boolean,
  onGuideIdsChange: (guideIds: string[]) => void
): PredefinedComboFormViewModel => {
  const [mode, setMode] =
    useState<PredefinedComboSelectionMode>(
      PREDEFINED_COMBO_SELECTION_MODE.CUSTOM
    );
  const [selectedComboId, setSelectedComboId] =
    useState<NullableRef<string>>(null);
  const selectedCombo =
    combos.find(({ id }) => id === selectedComboId) ?? null;
  const handlers = createPredefinedComboSelectionHandlers({
    combos,
    isComboReservation,
    mode,
    onGuideIdsChange,
    selectedCombo,
    setMode,
    setSelectedComboId,
  });

  return {
    mode: isComboReservation
      ? mode
      : PREDEFINED_COMBO_SELECTION_MODE.CUSTOM,
    selectedCombo:
      isComboReservation &&
      mode === PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED
        ? selectedCombo
        : null,
    selectedComboId: isComboReservation
      ? selectedComboId
      : null,
    ...handlers,
  };
};
