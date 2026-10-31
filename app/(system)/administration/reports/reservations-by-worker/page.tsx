import type { Metadata } from "next";
import { RESERVATIONS_BY_WORKER_METADATA } from "@/app/features/administration/reservations-by-worker/constants/ReservationsByWorkerMetadata.constants";
import ReservationsByWorker from "@/app/features/administration/reservations-by-worker/ReservationsByWorker";

export const metadata: Metadata =
  RESERVATIONS_BY_WORKER_METADATA;

const ReservationsByWorkerPage = async ({
  searchParams,
}: PageProps<"/administration/reports/reservations-by-worker">): Promise<React.JSX.Element> => (
  <ReservationsByWorker
    pageParameter={(await searchParams).page}
  />
);

export default ReservationsByWorkerPage;
