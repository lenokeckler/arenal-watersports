import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationDepositUnavailable from "./components/ReservationDepositUnavailable";
import type { ReservationDepositProps } from "./models/ReservationDepositProps.interface";
import ReservationDepositView from "./ReservationDepositView";
import { getReservationDeposit } from "./services/getReservationDeposit";
import { resolveReservationDepositUnavailableReason } from "./utils/resolveReservationDepositUnavailableReason";

const ReservationDeposit = async ({
  reservationId,
}: ReservationDepositProps): Promise<React.JSX.Element> => {
  await assertReservationCalendarAccess();

  const deposit =
    await getReservationDeposit(reservationId);

  if (!deposit) {
    notFound();
  }

  const reason =
    resolveReservationDepositUnavailableReason(deposit);

  if (reason !== null) {
    return (
      <ReservationDepositUnavailable
        reason={reason}
        reservationId={deposit.id}
      />
    );
  }

  return <ReservationDepositView deposit={deposit} />;
};

export default ReservationDeposit;
