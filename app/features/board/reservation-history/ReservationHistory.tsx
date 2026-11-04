import { Suspense } from "react";
import { parseReservationHistorySearchParams } from "@/app/services/board/reservation-history/utils/parseReservationHistorySearchParams";
import ReservationHistoryContent from "./components/ReservationHistoryContent";
import ReservationHistoryLoading from "./components/ReservationHistoryLoading";
import type { ReservationHistoryProps } from "./models/ReservationHistoryProps.interface";
import { buildReservationHistoryQueryString } from "./utils/buildReservationHistoryQueryString";

const ReservationHistory = ({
  searchParams,
}: ReservationHistoryProps): React.JSX.Element => {
  const query =
    parseReservationHistorySearchParams(searchParams);

  return (
    <Suspense
      key={buildReservationHistoryQueryString(query)}
      fallback={<ReservationHistoryLoading />}
    >
      <ReservationHistoryContent query={query} />
    </Suspense>
  );
};

export default ReservationHistory;
