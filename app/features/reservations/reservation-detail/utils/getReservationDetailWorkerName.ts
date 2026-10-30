import type { NullableRef } from "@/app/types";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";

export const getReservationDetailWorkerName = (
  workerNames: ReservationDetailWorkerName[],
  workerId: string
): NullableRef<string> =>
  workerNames.find(
    (worker) => worker.worker_id === workerId
  )?.full_name ?? null;
