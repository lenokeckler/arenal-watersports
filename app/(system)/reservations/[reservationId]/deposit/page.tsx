import type { Metadata } from "next";
import { RESERVATION_DEPOSIT_UI_COPY } from "@/app/features/reservations/reservation-deposit/constants/ReservationDepositUiCopy.constants";
import ReservationDeposit from "@/app/features/reservations/reservation-deposit/ReservationDeposit";

export const metadata: Metadata = {
  title: RESERVATION_DEPOSIT_UI_COPY.TITLE,
};

const ReservationDepositPage = async ({
  params,
}: PageProps<"/reservations/[reservationId]/deposit">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;

  return (
    <ReservationDeposit reservationId={reservationId} />
  );
};

export default ReservationDepositPage;
