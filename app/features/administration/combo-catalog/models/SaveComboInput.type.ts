import type { ComboAudience } from "./ComboAudience.type";
import type { SaveComboItemInput } from "./SaveComboItemInput.type";

export type SaveComboInput = {
  audience: ComboAudience;
  combo_id?: string;
  items: SaveComboItemInput[];
  name: string;
  package_price: number;
};
