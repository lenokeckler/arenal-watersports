import type { ReservationSplitCardProps } from "./ReservationSplitCardProps.interface";
import type { ReservationSplitDraft } from "./ReservationSplitDraft.interface";

export interface ReservationSplitDepartureCardProps extends ReservationSplitCardProps {
  departureNumber: number;
  draft: ReservationSplitDraft;
}
