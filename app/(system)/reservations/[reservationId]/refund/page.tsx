import type { Metadata } from "next";
import { RESERVATION_REFUND_UI_COPY } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundUiCopy.constants";
import ReservationRefund from "@/app/features/reservations/reservation-refund/ReservationRefund";

export const metadata: Metadata = {
  title: RESERVATION_REFUND_UI_COPY.TITLE,
};

const ReservationRefundPage = async ({
  params,
}: PageProps<"/reservations/[reservationId]/refund">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;

  return (
    <ReservationRefund reservationId={reservationId} />
  );
};

export default ReservationRefundPage;
