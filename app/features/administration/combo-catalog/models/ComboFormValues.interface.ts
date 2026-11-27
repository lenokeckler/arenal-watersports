import type { ComboAudience } from "./ComboAudience.type";
import type { ComboFormItemValues } from "./ComboFormItemValues.interface";

export interface ComboFormValues {
  audience: ComboAudience;
  items: ComboFormItemValues[];
  name: string;
  priceText: string;
}
