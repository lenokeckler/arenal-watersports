import type { ReservationByWorker } from "@/app/services/administration/reservations-by-worker/models/ReservationByWorker.interface";

export interface ReservationsByWorkerRecordsProps {
  reservations: ReservationByWorker[];
}
