import type { Metadata } from "next";
import { RESERVATION_EXTRA_TIME_UI_COPY } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeUiCopy.constants";
import ReservationExtraTime from "@/app/features/reservations/reservation-extra-time/ReservationExtraTime";

export const metadata: Metadata = {
  title: RESERVATION_EXTRA_TIME_UI_COPY.TITLE,
};

const ReservationExtraTimePage = async ({
  params,
}: PageProps<"/reservations/[reservationId]/extra-time">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;

  return (
    <ReservationExtraTime reservationId={reservationId} />
  );
};

export default ReservationExtraTimePage;
