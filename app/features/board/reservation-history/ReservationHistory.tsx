import { parseReservationHistorySearchParams } from "@/app/services/board/reservation-history/utils/parseReservationHistorySearchParams";
import { readReservationHistory } from "@/app/services/board/reservation-history/readReservationHistory";
import ReservationHistoryInner from "./components/ReservationHistoryInner";
import type { ReservationHistoryProps } from "./models/ReservationHistoryProps.interface";

const ReservationHistory = async ({
  searchParams,
}: ReservationHistoryProps): Promise<React.JSX.Element> => {
  const query =
    parseReservationHistorySearchParams(searchParams);
  const page = await readReservationHistory(query);

  return (
    <ReservationHistoryInner
      page={page}
      query={query}
    />
  );
};

export default ReservationHistory;
