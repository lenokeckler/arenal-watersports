import type { Metadata } from "next";
import { PENDING_DEPOSITS_METADATA } from "@/app/features/reservations/pending-deposits/constants/PendingDepositsMetadata.constants";
import PendingDeposits from "@/app/features/reservations/pending-deposits/PendingDeposits";

export const metadata: Metadata = PENDING_DEPOSITS_METADATA;

const PendingDepositsPage = (): React.JSX.Element => (
  <PendingDeposits />
);

export default PendingDepositsPage;
