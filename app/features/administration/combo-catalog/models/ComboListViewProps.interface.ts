import type { Combo } from "./Combo.interface";

export interface ComboListViewProps {
  combos: Combo[];
  fetchFailed: boolean;
}
