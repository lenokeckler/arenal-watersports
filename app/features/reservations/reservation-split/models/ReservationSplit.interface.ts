import type { ReservationSplitBlock } from "./ReservationSplitBlock.type";
import type { ReservationSplitItem } from "./ReservationSplitItem.interface";

export interface ReservationSplit {
  code: string;
  customerName: string;
  date: string;
  durationMinutes: number;
  expectedUpdatedAt: string;
  id: string;
  items: ReservationSplitItem[];
  peopleCount: number;
  splitBlock: ReservationSplitBlock;
  time: string;
}
