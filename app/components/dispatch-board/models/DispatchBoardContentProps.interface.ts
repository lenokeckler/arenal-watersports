import type { PendingDispatchReservation } from "./PendingDispatchReservation.interface";
import type { DispatchBoardProps } from "./DispatchBoardProps.interface";
import type { NullableRef } from "@/app/types";

export interface DispatchBoardContentProps extends DispatchBoardProps {
  errorMessage: NullableRef<string>;
  hasNextPage: boolean;
  reservations: PendingDispatchReservation[];
}
