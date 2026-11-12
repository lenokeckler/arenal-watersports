import type { FormEvent } from "react";
import type { NullableRef } from "@/app/types";
import type { InventoryCountQuantityField } from "../constants/InventoryCount.constants";
import type { InventoryCountResult } from "../constants/InventoryCount.constants";
import type { InventoryCountChangeEvent } from "./InventoryCountChangeEvent.type";
import type { InventoryCountDraft } from "./InventoryCountDraft.interface";

export interface InventoryCountForm {
  draft: InventoryCountDraft;
  handleNotesChange: (
    event: InventoryCountChangeEvent
  ) => void;
  handleQuantityChange: (
    categoryId: string,
    field: InventoryCountQuantityField
  ) => (event: InventoryCountChangeEvent) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleUnitStatusChange: (
    unitId: string
  ) => (event: InventoryCountChangeEvent) => void;
  invalidCategoryIds: ReadonlySet<string>;
  isSubmitting: boolean;
  result: NullableRef<InventoryCountResult>;
}
