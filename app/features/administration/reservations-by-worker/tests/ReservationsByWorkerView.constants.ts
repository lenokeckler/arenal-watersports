import type { ReservationsByWorkerPage } from "@/app/services/administration/reservations-by-worker/models/ReservationsByWorkerPage.interface";

export const RESERVATIONS_BY_WORKER_TEST_RECORD = {
  code: "R-000123",
  customerName: "Cliente de prueba",
  id: "aaaaaaaa-0000-0000-0000-000000000001",
  workerName: "Creador de la reserva",
};

export const RESERVATIONS_BY_WORKER_TEST_PAGE: ReservationsByWorkerPage =
  {
    items: [RESERVATIONS_BY_WORKER_TEST_RECORD],
    pageCount: 2,
    pageIndex: 0,
    totalCount: 11,
  };

export const RESERVATIONS_BY_WORKER_EMPTY_PAGE: ReservationsByWorkerPage =
  {
    items: [],
    pageCount: 1,
    pageIndex: 0,
    totalCount: 0,
  };
