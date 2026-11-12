import type { Metadata } from "next";
import { RESERVATION_CHARGE_UI_COPY } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeUiCopy.constants";
import ReservationCharge from "@/app/features/reservations/reservation-charge/ReservationCharge";

export const metadata: Metadata = {
  title: RESERVATION_CHARGE_UI_COPY.TITLE,
};

const ReservationChargePage = async ({
  params,
}: PageProps<"/reservations/[reservationId]/charge">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;

  return (
    <ReservationCharge reservationId={reservationId} />
  );
};

export default ReservationChargePage;
