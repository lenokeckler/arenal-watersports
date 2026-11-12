import { INVENTORY_COUNT_STORAGE_KEY } from "../constants/InventoryCount.constants";
import type { InventoryCountCategory } from "../models/InventoryCountCategory.type";
import type { InventoryCountStoredState } from "../models/InventoryCountStoredState.interface";

export const loadInventoryCountDraft = (
  categories: InventoryCountCategory[]
): InventoryCountStoredState | null => {
  try {
    const raw = window.localStorage.getItem(
      INVENTORY_COUNT_STORAGE_KEY
    );

    if (raw === null) {
      return null;
    }

    const stored = JSON.parse(
      raw
    ) as InventoryCountStoredState;
    const knownIds = new Set(
      categories.map((category) => category.id)
    );

    return {
      draft: stored.draft,
      reviewedIds: stored.reviewedIds.filter((id) =>
        knownIds.has(id)
      ),
    };
  } catch {
    return null;
  }
};

export const saveInventoryCountDraft = (
  state: InventoryCountStoredState
): boolean => {
  try {
    window.localStorage.setItem(
      INVENTORY_COUNT_STORAGE_KEY,
      JSON.stringify(state)
    );

    return true;
  } catch {
    return false;
  }
};

export const clearInventoryCountDraft = (): boolean => {
  try {
    window.localStorage.removeItem(
      INVENTORY_COUNT_STORAGE_KEY
    );

    return true;
  } catch {
    return false;
  }
};
