import type { ReservationSplit } from "./ReservationSplit.interface";
import type { ReservationSplitUnavailableReason } from "./ReservationSplitUnavailableReason.type";

export interface ReservationSplitUnavailableProps {
  reason: ReservationSplitUnavailableReason;
  split: ReservationSplit;
}
