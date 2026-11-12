import type { Metadata } from "next";
import ReservationDetail from "@/app/features/reservations/reservation-detail/ReservationDetail";
import { RESERVATION_DETAIL_COPY } from "@/app/features/reservations/reservation-detail/constants/ReservationDetailCopy.constants";

export const metadata: Metadata = {
  title: RESERVATION_DETAIL_COPY.TITLE,
};

const ReservationDetailPage = async ({
  params,
}: PageProps<"/reservations/[reservationId]">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;
  return (
    <ReservationDetail reservationId={reservationId} />
  );
};

export default ReservationDetailPage;
