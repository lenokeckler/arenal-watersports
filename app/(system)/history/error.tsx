"use client";

import ReservationHistoryError from "@/app/features/board/reservation-history/components/ReservationHistoryError";
import { RESERVATION_HISTORY_COPY } from "@/app/features/board/reservation-history/constants/ReservationHistoryCopy.constants";
import type { ReservationHistoryResetProps } from "@/app/features/board/reservation-history/models/ReservationHistoryResetProps.interface";

const ReservationHistoryRouteError = ({
  reset,
}: ReservationHistoryResetProps): React.JSX.Element => (
  <ReservationHistoryError
    reset={reset}
    title={RESERVATION_HISTORY_COPY.ERROR_TITLE}
  />
);

export default ReservationHistoryRouteError;
