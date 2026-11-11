import type { Metadata } from "next";
import { RESERVATION_CANCELLATION_UI_COPY } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationUiCopy.constants";
import ReservationCancellation from "@/app/features/reservations/reservation-cancellation/ReservationCancellation";

export const metadata: Metadata = {
  title: RESERVATION_CANCELLATION_UI_COPY.TITLE,
};

const ReservationCancellationPage = async ({
  params,
}: PageProps<"/reservations/[reservationId]/cancel">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;

  return (
    <ReservationCancellation
      reservationId={reservationId}
    />
  );
};

export default ReservationCancellationPage;
