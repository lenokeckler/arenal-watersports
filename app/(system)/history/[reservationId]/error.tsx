"use client";

import { PATHS } from "@/app/constants";
import ReservationHistoryError from "@/app/features/board/reservation-history/components/ReservationHistoryError";
import { RESERVATION_HISTORY_COPY } from "@/app/features/board/reservation-history/constants/ReservationHistoryCopy.constants";
import type { ReservationHistoryResetProps } from "@/app/features/board/reservation-history/models/ReservationHistoryResetProps.interface";

const ReservationHistoryDetailRouteError = ({
  reset,
}: ReservationHistoryResetProps): React.JSX.Element => (
  <ReservationHistoryError
    backHref={PATHS.HISTORY.ROOT}
    reset={reset}
    title={RESERVATION_HISTORY_COPY.DETAIL_ERROR_TITLE}
  />
);

export default ReservationHistoryDetailRouteError;
