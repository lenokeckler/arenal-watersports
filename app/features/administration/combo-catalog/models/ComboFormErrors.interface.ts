import type { ComboFormItemErrors } from "./ComboFormItemErrors.interface";

export interface ComboFormErrors {
  audience?: string;
  count: number;
  itemErrors: ComboFormItemErrors[];
  items?: string;
  name?: string;
  price?: string;
}
