import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import type { NullableRef } from "@/app/types";
import type { PredefinedComboSelectionHandlersInput } from "../models/PredefinedComboSelectionHandlersInput.interface";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";

const hasGuideOnlyItem = (
  combo: NullableRef<ReservationPredefinedCombo>
): boolean =>
  combo?.items.some(({ isGuideOnly }) => isGuideOnly) ??
  false;

const createResetHandler =
  (
    input: PredefinedComboSelectionHandlersInput
  ): (() => void) =>
  () => {
    if (hasGuideOnlyItem(input.selectedCombo)) {
      input.onGuideIdsChange([]);
    }
    input.clearSubmissionStatus?.();
    input.setMode(PREDEFINED_COMBO_SELECTION_MODE.CUSTOM);
    input.setSelectedComboId(null);
  };

const createModeChangeHandler =
  (
    input: PredefinedComboSelectionHandlersInput,
    reset: () => void
  ): ((
    mode: PredefinedComboSelectionHandlersInput["mode"]
  ) => void) =>
  (nextMode) => {
    if (
      nextMode === PREDEFINED_COMBO_SELECTION_MODE.CUSTOM
    ) {
      reset();
      return;
    }
    if (input.isComboReservation) {
      input.clearSubmissionStatus?.();
      input.onGuideIdsChange([]);
      input.setMode(nextMode);
    }
  };

const createComboSelectionHandler =
  (
    input: PredefinedComboSelectionHandlersInput
  ): ((comboId: string) => void) =>
  (comboId) => {
    if (
      !input.isComboReservation ||
      input.mode !==
        PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED
    ) {
      return;
    }
    const nextCombo =
      input.combos.find(({ id }) => id === comboId) ?? null;
    input.clearSubmissionStatus?.();
    if (
      hasGuideOnlyItem(input.selectedCombo) &&
      !hasGuideOnlyItem(nextCombo)
    ) {
      input.onGuideIdsChange([]);
    }
    input.setSelectedComboId(nextCombo?.id ?? null);
  };

export const createPredefinedComboSelectionHandlers = (
  input: PredefinedComboSelectionHandlersInput
) => {
  const reset = createResetHandler(input);
  return {
    handleComboSelection:
      createComboSelectionHandler(input),
    handleModeChange: createModeChangeHandler(input, reset),
    reset,
  };
};
