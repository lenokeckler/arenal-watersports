import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationCancellationUnavailable from "./components/ReservationCancellationUnavailable";
import type { ReservationCancellationProps } from "./models/ReservationCancellationProps.interface";
import ReservationCancellationView from "./ReservationCancellationView";
import { getReservationCancellation } from "./services/getReservationCancellation";
import { isReservationCancellationBlockedStatus } from "./utils/isReservationCancellationBlockedStatus";

const ReservationCancellation = async ({
  reservationId,
}: ReservationCancellationProps): Promise<React.JSX.Element> => {
  await assertReservationCalendarAccess();

  const cancellation =
    await getReservationCancellation(reservationId);

  if (!cancellation) {
    notFound();
  }

  if (
    isReservationCancellationBlockedStatus(
      cancellation.status
    )
  ) {
    return (
      <ReservationCancellationUnavailable
        status={cancellation.status}
      />
    );
  }

  return (
    <ReservationCancellationView
      cancellation={cancellation}
    />
  );
};

export default ReservationCancellation;
