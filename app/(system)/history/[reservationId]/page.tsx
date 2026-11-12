import type { Metadata } from "next";
import { RESERVATION_HISTORY_DETAIL_METADATA } from "@/app/features/board/reservation-history/constants/ReservationHistoryMetadata.constants";
import ReservationHistoryDetail from "@/app/features/board/reservation-history/ReservationHistoryDetail";

export const metadata: Metadata =
  RESERVATION_HISTORY_DETAIL_METADATA;

const ReservationHistoryDetailPage = async ({
  params,
  searchParams,
}: PageProps<"/history/[reservationId]">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;

  return (
    <ReservationHistoryDetail
      reservationId={reservationId}
      searchParams={await searchParams}
    />
  );
};

export default ReservationHistoryDetailPage;
