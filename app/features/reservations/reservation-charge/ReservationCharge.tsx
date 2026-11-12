import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationChargeUnavailable from "./components/ReservationChargeUnavailable";
import type { ReservationChargeProps } from "./models/ReservationChargeProps.interface";
import ReservationChargeView from "./ReservationChargeView";
import { getReservationCharge } from "./services/getReservationCharge";
import { resolveReservationChargeUnavailableReason } from "./utils/resolveReservationChargeUnavailableReason";

const ReservationCharge = async ({
  reservationId,
}: ReservationChargeProps): Promise<React.JSX.Element> => {
  await assertReservationCalendarAccess();

  const charge = await getReservationCharge(reservationId);

  if (!charge) {
    notFound();
  }

  const unavailableReason =
    resolveReservationChargeUnavailableReason(charge);

  if (unavailableReason !== null) {
    return (
      <ReservationChargeUnavailable
        reason={unavailableReason}
        reservationId={charge.id}
      />
    );
  }

  return <ReservationChargeView charge={charge} />;
};

export default ReservationCharge;
