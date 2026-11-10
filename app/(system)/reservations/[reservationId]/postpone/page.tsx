import type { Metadata } from "next";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "@/app/features/reservations/reservation-postponement/constants/ReservationPostponementUiCopy.constants";
import ReservationPostponement from "@/app/features/reservations/reservation-postponement/ReservationPostponement";

export const metadata: Metadata = {
  title: RESERVATION_POSTPONEMENT_UI_COPY.TITLE,
};

const ReservationPostponementPage = async ({
  params,
}: PageProps<"/reservations/[reservationId]/postpone">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;

  return (
    <ReservationPostponement
      reservationId={reservationId}
    />
  );
};

export default ReservationPostponementPage;
