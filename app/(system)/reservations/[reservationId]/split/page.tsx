import type { Metadata } from "next";
import { RESERVATION_SPLIT_UI_COPY } from "@/app/features/reservations/reservation-split/constants/ReservationSplitUiCopy.constants";
import ReservationSplit from "@/app/features/reservations/reservation-split/ReservationSplit";

export const metadata: Metadata = {
  title: RESERVATION_SPLIT_UI_COPY.TITLE,
};

const ReservationSplitPage = async ({
  params,
}: PageProps<"/reservations/[reservationId]/split">): Promise<React.JSX.Element> => {
  const { reservationId } = await params;

  return <ReservationSplit reservationId={reservationId} />;
};

export default ReservationSplitPage;
