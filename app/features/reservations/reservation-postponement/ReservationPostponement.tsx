import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationPostponementLayout from "./components/ReservationPostponementLayout";
import ReservationPostponementSummary from "./components/ReservationPostponementSummary";
import ReservationPostponementUnavailable from "./components/ReservationPostponementUnavailable";
import { RESERVATION_POSTPONEMENT_BLOCK } from "./constants/ReservationPostponementBlock.constants";
import type { ReservationPostponementProps } from "./models/ReservationPostponementProps.interface";
import { getReservationPostponement } from "./services/getReservationPostponement";
import { isReservationPostponementBlockedStatus } from "./utils/isReservationPostponementBlockedStatus";

const ReservationPostponement = async ({
  reservationId,
}: ReservationPostponementProps): Promise<React.JSX.Element> => {
  await assertReservationCalendarAccess();

  const postponement =
    await getReservationPostponement(reservationId);

  if (!postponement) {
    notFound();
  }

  if (
    postponement.block !==
      RESERVATION_POSTPONEMENT_BLOCK.NONE &&
    isReservationPostponementBlockedStatus(
      postponement.status
    )
  ) {
    return (
      <ReservationPostponementUnavailable
        status={postponement.status}
      />
    );
  }

  return (
    <ReservationPostponementLayout>
      <ReservationPostponementSummary
        postponement={postponement}
      />
    </ReservationPostponementLayout>
  );
};

export default ReservationPostponement;
