import type { ReservationSplitFocusTarget } from "./ReservationSplitFocusTarget.interface";

export interface ReservationSplitDepartureFocus {
  announcement: string;
  moveFocus: (target: ReservationSplitFocusTarget) => void;
}
