import { useState } from "react";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import type { PredefinedComboSelectionMode } from "../models/PredefinedComboSelectionMode.type";
import type { PredefinedComboFormViewModel } from "../models/PredefinedComboFormViewModel.interface";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import { createPredefinedComboSelectionHandlers } from "../utils/createPredefinedComboSelectionHandlers";
import { createPredefinedComboFormViewModel } from "../utils/createPredefinedComboFormViewModel";

export const usePredefinedComboForm = (
  combos: ReservationPredefinedCombo[],
  isComboReservation: boolean,
  onGuideIdsChange: (guideIds: string[]) => void,
  clearSubmissionStatus: NullableUndefined<
    () => void
  > = undefined
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
    clearSubmissionStatus,
    isComboReservation,
    mode,
    onGuideIdsChange,
    selectedCombo,
    setMode,
    setSelectedComboId,
  });

  return createPredefinedComboFormViewModel({
    combos,
    handlers,
    isComboReservation,
    mode,
    selectedCombo,
    selectedComboId,
  });
};
