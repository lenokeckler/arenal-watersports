import type { NullableRef } from "@/app/types";
import type { ReservationPredefinedCombo } from "./ReservationPredefinedCombo.interface";

export interface PredefinedComboCatalogFieldProps {
  combos: ReservationPredefinedCombo[];
  selectedComboId: NullableRef<string>;
  onComboSelection: (comboId: string) => void;
}
