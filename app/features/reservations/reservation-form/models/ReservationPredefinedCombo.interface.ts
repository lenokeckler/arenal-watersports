import type { Database } from "@/app/types";
import type { ReservationPredefinedComboItem } from "./ReservationPredefinedComboItem.interface";

export interface ReservationPredefinedCombo {
  audience: Database["public"]["Enums"]["combo_audience"];
  currency: Database["public"]["Enums"]["currency_code"];
  id: string;
  items: ReservationPredefinedComboItem[];
  name: string;
  packagePrice: number;
}
