import type { Metadata } from "next";
import ReservationEdit from "@/app/features/reservations/reservation-form/ReservationEdit";
import { RESERVATION_EDIT_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationEditCopy.constants";

export const metadata: Metadata = {
  title: RESERVATION_EDIT_COPY.TITLE,
};

const ReservationEditPage = async ({
  params,
}: PageProps<"/reservations/[reservationId]/edit">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;

  return <ReservationEdit reservationId={reservationId} />;
};

export default ReservationEditPage;
