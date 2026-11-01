"use client";

import ReservationHistoryError from "@/app/features/board/reservation-history/components/ReservationHistoryError";
import type { ReservationHistoryResetProps } from "@/app/features/board/reservation-history/models/ReservationHistoryResetProps.interface";

const ReservationHistoryDetailRouteError = ({
  reset,
}: ReservationHistoryResetProps): React.JSX.Element => (
  <ReservationHistoryError reset={reset} />
);

export default ReservationHistoryDetailRouteError;
