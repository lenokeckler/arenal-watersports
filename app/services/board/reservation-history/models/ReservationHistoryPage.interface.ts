import type { ReservationHistoryItem } from "./ReservationHistoryItem.interface";

export interface ReservationHistoryPage {
  items: readonly ReservationHistoryItem[];
  pageCount: number;
  pageIndex: number;
  totalCount: number;
}
