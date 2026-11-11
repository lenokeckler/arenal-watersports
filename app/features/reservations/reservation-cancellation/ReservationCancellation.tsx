import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import type { ReservationCancellationProps } from "./models/ReservationCancellationProps.interface";
import ReservationCancellationView from "./ReservationCancellationView";
import { getReservationCancellation } from "./services/getReservationCancellation";

const ReservationCancellation = async ({
  reservationId,
}: ReservationCancellationProps): Promise<React.JSX.Element> => {
  await assertReservationCalendarAccess();

  const cancellation =
    await getReservationCancellation(reservationId);

  if (!cancellation) {
    notFound();
  }

  return (
    <ReservationCancellationView
      cancellation={cancellation}
    />
  );
};

export default ReservationCancellation;
