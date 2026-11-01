import { PAGINATION } from "@/app/constants";

export const RESERVATIONS_BY_WORKER_TEST_ROW = {
  code: "R-000123",
  customer_name: "Cliente de prueba",
  id: "aaaaaaaa-0000-0000-0000-000000000001",
  worker: { full_name: "Creador de la reserva" },
};

export const RESERVATIONS_BY_WORKER_TEST_PAGE = {
  count: PAGINATION.DEFAULT_PAGE_SIZE + PAGINATION.ONE_PAGE,
  data: [RESERVATIONS_BY_WORKER_TEST_ROW],
  error: null,
};

export const RESERVATIONS_BY_WORKER_OUT_OF_RANGE = {
  code: "PGRST103",
  details: null,
  hint: null,
  message: "Requested range not satisfiable",
};
