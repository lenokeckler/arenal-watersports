import type { ComboFormItemErrors } from "./ComboFormItemErrors.interface";

export interface ComboItemsValidation {
  itemErrors: ComboFormItemErrors[];
  itemsError?: string;
}
