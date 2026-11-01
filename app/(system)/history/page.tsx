import type { Metadata } from "next";
import { RESERVATION_HISTORY_METADATA } from "@/app/features/board/reservation-history/constants/ReservationHistoryMetadata.constants";
import ReservationHistory from "@/app/features/board/reservation-history/ReservationHistory";

export const metadata: Metadata =
  RESERVATION_HISTORY_METADATA;

const ReservationHistoryPage = async ({
  searchParams,
}: PageProps<"/history">): Promise<React.JSX.Element> => (
  <ReservationHistory searchParams={await searchParams} />
);

export default ReservationHistoryPage;
