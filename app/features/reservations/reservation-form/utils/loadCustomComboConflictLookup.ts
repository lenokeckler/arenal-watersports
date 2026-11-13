import type { Dispatch, SetStateAction } from "react";
import type { CustomComboConflictLookupState } from "../models/CustomComboConflictLookupState.interface";
import type { CustomComboConflictRequest } from "../models/CustomComboConflictRequest.interface";
import { EMPTY_CUSTOM_COMBO_CONFLICTS } from "../constants/CustomComboConflictLookup.constants";
import { readCustomComboCategoryConflicts } from "./readCustomComboCategoryConflicts";

export const loadCustomComboConflictLookup = async (
  request: CustomComboConflictRequest,
  setLookup: Dispatch<
    SetStateAction<CustomComboConflictLookupState>
  >,
  isCurrentRequest: () => boolean
): Promise<void> => {
  try {
    const conflicts =
      await readCustomComboCategoryConflicts(request);
    if (isCurrentRequest()) {
      setLookup({
        key: request.key,
        conflicts,
        hasError: false,
        isLoading: false,
      });
    }
  } catch {
    if (isCurrentRequest()) {
      setLookup({
        key: request.key,
        conflicts: EMPTY_CUSTOM_COMBO_CONFLICTS,
        hasError: true,
        isLoading: false,
      });
    }
  }
};
