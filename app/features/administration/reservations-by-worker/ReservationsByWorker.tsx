import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readReservationsByWorker } from "@/app/services/administration/reservations-by-worker/readReservationsByWorker";
import { resolveReservationsByWorkerPageIndex } from "@/app/services/administration/reservations-by-worker/utils/resolveReservationsByWorkerPageIndex";
import type { ReservationsByWorkerProps } from "./models/ReservationsByWorkerProps.interface";
import ReservationsByWorkerView from "./ReservationsByWorkerView";

const ReservationsByWorker = async ({
  pageParameter,
}: ReservationsByWorkerProps): Promise<React.JSX.Element> => {
  const pageIndex =
    resolveReservationsByWorkerPageIndex(pageParameter);
  const reservationsPage =
    await readReservationsByWorker(pageIndex);

  if (!reservationsPage) {
    redirect(PATHS.HOME);
  }

  return (
    <ReservationsByWorkerView
      reservationsPage={reservationsPage}
    />
  );
};

export default ReservationsByWorker;
