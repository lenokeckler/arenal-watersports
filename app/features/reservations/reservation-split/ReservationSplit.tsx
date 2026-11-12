import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_SPLIT_BLOCK } from "./constants/ReservationSplitBlock.constants";
import ReservationSplitUnavailable from "./components/ReservationSplitUnavailable";
import type { ReservationSplitProps } from "./models/ReservationSplitProps.interface";
import { getReservationSplit } from "./services/getReservationSplit";
import ReservationSplitView from "./ReservationSplitView";

const ReservationSplit = async ({
  reservationId,
}: ReservationSplitProps): Promise<React.JSX.Element> => {
  await assertReservationCalendarAccess();

  const split = await getReservationSplit(reservationId);

  if (!split) {
    notFound();
  }

  if (split.splitBlock !== RESERVATION_SPLIT_BLOCK.NONE) {
    return (
      <ReservationSplitUnavailable
        reason={split.splitBlock}
      />
    );
  }

  return <ReservationSplitView split={split} />;
};

export default ReservationSplit;
