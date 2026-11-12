import type { ReservationSplitItemKind } from "./ReservationSplitItemKind.type";

export interface ReservationSplitItem {
  categoryName: string;
  id: string;
  kind: ReservationSplitItemKind;
  label: string;
  pieces: number;
}
