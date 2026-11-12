import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { isReservationChargeable } from "@/app/utils/reservations/isReservationChargeable";
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

  if (!isReservationChargeable(charge)) {
    return (
      <ReservationChargeUnavailable
        reason={resolveReservationChargeUnavailableReason(
          charge
        )}
        reservationId={charge.id}
      />
    );
  }

  return <ReservationChargeView charge={charge} />;
};

export default ReservationCharge;
