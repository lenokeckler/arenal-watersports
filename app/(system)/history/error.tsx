"use client";

import ReservationHistoryError from "@/app/features/board/reservation-history/components/ReservationHistoryError";
import type { ReservationHistoryResetProps } from "@/app/features/board/reservation-history/models/ReservationHistoryResetProps.interface";

const ReservationHistoryRouteError = ({
  reset,
}: ReservationHistoryResetProps): React.JSX.Element => (
  <ReservationHistoryError reset={reset} />
);

export default ReservationHistoryRouteError;
