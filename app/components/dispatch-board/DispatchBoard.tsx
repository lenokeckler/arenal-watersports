import { DISPATCH_BOARD_COPY } from "./constants/DispatchBoard.constants";
import type { PendingDispatchReservation } from "./models/PendingDispatchReservation.interface";
import type { DispatchBoardProps } from "./models/DispatchBoardProps.interface";
import type { NullableRef } from "@/app/types";
import {
  getPendingDispatchReservations,
  OperationsAccessError,
} from "@/app/services/operations/getPendingDispatchReservations";
import { DispatchBoardView } from "./DispatchBoardView";
import type { JSX } from "react";

const DispatchBoard = async ({
  page,
}: DispatchBoardProps): Promise<JSX.Element> => {
  let reservations: PendingDispatchReservation[] = [];
  let hasNextPage = false;
  let errorMessage: NullableRef<string> = null;

  try {
    const result =
      await getPendingDispatchReservations(page);
    reservations = result.reservations;
    hasNextPage = result.hasNextPage;
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? DISPATCH_BOARD_COPY.FORBIDDEN
        : DISPATCH_BOARD_COPY.ERROR;
  }

  return (
    <DispatchBoardView
      errorMessage={errorMessage}
      hasNextPage={hasNextPage}
      page={page}
      reservations={reservations}
    />
  );
};

export default DispatchBoard;
