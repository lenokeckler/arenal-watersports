import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import DepositResolutionUnavailable from "./components/DepositResolutionUnavailable";
import DepositResolutionView from "./DepositResolutionView";
import type { DepositResolutionProps } from "./models/DepositResolutionProps.interface";
import { getDepositResolution } from "./services/getDepositResolution";
import { resolveDepositResolutionUnavailableReason } from "./utils/resolveDepositResolutionUnavailableReason";

const DepositResolution = async ({
  depositId,
}: DepositResolutionProps): Promise<React.JSX.Element> => {
  await assertReservationCalendarAccess();

  const deposit = await getDepositResolution(depositId);

  if (!deposit) {
    notFound();
  }

  const reason =
    resolveDepositResolutionUnavailableReason(deposit);

  return reason === null ? (
    <DepositResolutionView deposit={deposit} />
  ) : (
    <DepositResolutionUnavailable reason={reason} />
  );
};

export default DepositResolution;
