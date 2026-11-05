import { notFound } from "next/navigation";
import { readReservationHistoryRecord } from "@/app/services/board/reservation-history/readReservationHistoryRecord";
import { parseReservationHistorySearchParams } from "@/app/services/board/reservation-history/utils/parseReservationHistorySearchParams";
import ReservationHistoryDetailInner from "./components/ReservationHistoryDetailInner";
import type { ReservationHistoryDetailProps } from "./models/ReservationHistoryDetailProps.interface";
import { buildReservationHistoryHref } from "./utils/buildReservationHistoryHref";

const ReservationHistoryDetail = async ({
  reservationId,
  searchParams,
}: ReservationHistoryDetailProps): Promise<React.JSX.Element> => {
  const query =
    parseReservationHistorySearchParams(searchParams);
  const record =
    await readReservationHistoryRecord(reservationId);

  if (record === null) {
    notFound();
  }

  return (
    <ReservationHistoryDetailInner
      record={record}
      backHref={buildReservationHistoryHref(query)}
    />
  );
};

export default ReservationHistoryDetail;
