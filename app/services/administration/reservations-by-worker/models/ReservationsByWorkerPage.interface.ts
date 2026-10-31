import type { ReservationByWorker } from "./ReservationByWorker.interface";

export interface ReservationsByWorkerPage {
  items: ReservationByWorker[];
  pageCount: number;
  pageIndex: number;
  totalCount: number;
}
