"use client";

import ReservationHistoryError from "@/app/features/board/reservation-history/components/ReservationHistoryError";
import type { ReservationHistoryErrorProps } from "@/app/features/board/reservation-history/models/ReservationHistoryErrorProps.interface";

const ReservationHistoryRouteError = ({
  reset,
}: ReservationHistoryErrorProps): React.JSX.Element => (
  <ReservationHistoryError reset={reset} />
);

export default ReservationHistoryRouteError;
