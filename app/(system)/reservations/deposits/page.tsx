import type { Metadata } from "next";
import { PENDING_DEPOSITS_METADATA } from "@/app/features/reservations/pending-deposits/constants/PendingDepositsMetadata.constants";
import PendingDeposits from "@/app/features/reservations/pending-deposits/PendingDeposits";

export const metadata: Metadata = PENDING_DEPOSITS_METADATA;

const PendingDepositsPage = async ({
  searchParams,
}: PageProps<"/reservations/deposits">): Promise<React.JSX.Element> => (
  <PendingDeposits pageParam={(await searchParams).page} />
);

export default PendingDepositsPage;
