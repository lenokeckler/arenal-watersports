import { notFound } from "next/navigation";
import { getReservationDetail } from "./services/getReservationDetail";
import type { ReservationDetailEntryProps } from "./models/ReservationDetailEntryProps.interface";
import ReservationDetailView from "./ReservationDetailView";

const ReservationDetail = async ({
  reservationId,
}: ReservationDetailEntryProps): Promise<React.JSX.Element> => {
  const detail = await getReservationDetail(reservationId);

  if (detail === null) {
    notFound();
  }

  return <ReservationDetailView detail={detail} />;
};

export default ReservationDetail;
