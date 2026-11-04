import { readReservationHistory } from "@/app/services/board/reservation-history/readReservationHistory";
import { readReservationHistoryCategoryOptions } from "@/app/services/board/reservation-history/readReservationHistoryCategoryOptions";
import type { ReservationHistoryContentProps } from "../models/ReservationHistoryContentProps.interface";
import ReservationHistoryInner from "./ReservationHistoryInner";

const ReservationHistoryContent = async ({
  query,
}: ReservationHistoryContentProps): Promise<React.JSX.Element> => {
  const [page, categoryOptions] = await Promise.all([
    readReservationHistory(query),
    readReservationHistoryCategoryOptions(),
  ]);

  return (
    <ReservationHistoryInner
      page={page}
      query={query}
      categoryOptions={categoryOptions}
      hasInvertedDateRange={query.hasInvertedDateRange}
    />
  );
};

export default ReservationHistoryContent;
