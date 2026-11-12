import type { FormEvent } from "react";
import type { NullableRef } from "@/app/types";
import type {
  InventoryCountQuantityField,
  InventoryCountResult,
  InventoryCountUnitStatus,
} from "../constants/InventoryCount.constants";
import type { InventoryCountCategory } from "./InventoryCountCategory.type";
import type { InventoryCountChangeEvent } from "./InventoryCountChangeEvent.type";
import type { InventoryCountDraft } from "./InventoryCountDraft.interface";

export interface InventoryCountForm {
  canRegister: boolean;
  closeCategory: () => void;
  confirmCategory: () => void;
  draft: InventoryCountDraft;
  handleNotesChange: (
    event: InventoryCountChangeEvent
  ) => void;
  handleQuantityChange: (
    categoryId: string,
    field: InventoryCountQuantityField
  ) => (event: InventoryCountChangeEvent) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  invalidCategoryIds: ReadonlySet<string>;
  isPanelOpen: boolean;
  isSubmitting: boolean;
  matchAll: () => void;
  openCategory: (categoryId: string) => void;
  pendingCount: number;
  result: NullableRef<InventoryCountResult>;
  reviewedIds: ReadonlySet<string>;
  selectedCategory: NullableRef<InventoryCountCategory>;
  setUnitStatus: (
    categoryId: string,
    unitId: string,
    status: InventoryCountUnitStatus
  ) => void;
}
