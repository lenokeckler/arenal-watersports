import type { ReservationSplitItemInput } from "./ReservationSplitItemInput.interface";

export interface ReservationSplitDepartureInput {
  items: ReservationSplitItemInput[];
  peopleCount: number;
  time: string;
}
