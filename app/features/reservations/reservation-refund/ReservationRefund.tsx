import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import type { ReservationRefundProps } from "./models/ReservationRefundProps.interface";
import ReservationRefundView from "./ReservationRefundView";
import { getReservationRefund } from "./services/getReservationRefund";

const ReservationRefund = async ({
  reservationId,
}: ReservationRefundProps): Promise<React.JSX.Element> => {
  await assertReservationCalendarAccess();

  const refund = await getReservationRefund(reservationId);

  if (!refund) {
    notFound();
  }

  return <ReservationRefundView refund={refund} />;
};

export default ReservationRefund;
