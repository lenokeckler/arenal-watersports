import type { PendingDispatchReservation } from "./PendingDispatchReservation.interface";
import type { DispatchBoardProps } from "./DispatchBoardProps.interface";

export interface DispatchBoardContentProps extends DispatchBoardProps {
  hasNextPage: boolean;
  reservations: PendingDispatchReservation[];
}
