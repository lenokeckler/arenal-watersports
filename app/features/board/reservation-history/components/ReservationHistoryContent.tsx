import { readReservationHistory } from "@/app/services/board/reservation-history/readReservationHistory";
import type { ReservationHistoryContentProps } from "../models/ReservationHistoryContentProps.interface";
import ReservationHistoryInner from "./ReservationHistoryInner";

const ReservationHistoryContent = async ({
  query,
}: ReservationHistoryContentProps): Promise<React.JSX.Element> => {
  const page = await readReservationHistory(query);

  return (
    <ReservationHistoryInner
      page={page}
      query={query}
    />
  );
};

export default ReservationHistoryContent;
