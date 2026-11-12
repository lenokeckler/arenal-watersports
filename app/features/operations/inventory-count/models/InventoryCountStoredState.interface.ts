import type { InventoryCountDraft } from "./InventoryCountDraft.interface";

export interface InventoryCountStoredState {
  draft: InventoryCountDraft;
  reviewedIds: string[];
}
