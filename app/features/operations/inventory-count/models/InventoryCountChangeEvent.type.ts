import type { ChangeEvent } from "react";

export type InventoryCountChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
