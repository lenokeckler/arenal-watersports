import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationExtraTimeUnavailable from "./components/ReservationExtraTimeUnavailable";
import type { ReservationExtraTimeProps } from "./models/ReservationExtraTimeProps.interface";
import ReservationExtraTimeView from "./ReservationExtraTimeView";
import { getReservationExtraTime } from "./services/getReservationExtraTime";
import { resolveReservationExtraTimeUnavailableReason } from "./utils/resolveReservationExtraTimeUnavailableReason";

const ReservationExtraTime = async ({
  reservationId,
}: ReservationExtraTimeProps): Promise<React.JSX.Element> => {
  await assertReservationCalendarAccess();

  const extraTime =
    await getReservationExtraTime(reservationId);

  if (!extraTime) {
    notFound();
  }

  const reason =
    resolveReservationExtraTimeUnavailableReason(extraTime);

  return reason === null ? (
    <ReservationExtraTimeView extraTime={extraTime} />
  ) : (
    <ReservationExtraTimeUnavailable
      extraTime={extraTime}
      reason={reason}
    />
  );
};

export default ReservationExtraTime;
