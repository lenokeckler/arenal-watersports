import { RESERVATIONS_BY_WORKER_COPY } from "@/app/features/administration/reservations-by-worker/constants/ReservationsByWorkerCopy.constants";
import { E2E_WORKER } from "./E2eWorker.constants";

export const E2E_RESERVATIONS_BY_WORKER_COPY =
  RESERVATIONS_BY_WORKER_COPY;

export const E2E_RESERVATION = {
  CUSTOMER_PREFIX: "ADM-29 E2E",
  DURATION_MINUTES: 60,
  FULL_NAME: E2E_WORKER.FULL_NAME,
  PEOPLE_COUNT: 1,
  STARTS_AT: "2030-01-01T12:00:00.000Z",
  TYPE: "tour",
} as const;

export const E2E_RESERVATION_COLUMNS = {
  CREATED_BY: "created_by",
  CUSTOMER_NAME: "customer_name",
  DURATION_MINUTES: "duration_minutes",
  ID: "id",
  PEOPLE_COUNT: "people_count",
  STARTS_AT: "starts_at",
  TYPE: "type",
  UPDATED_BY: "updated_by",
} as const;

export const E2E_RESERVATION_SCREENSHOT = {
  REPORT: "01-reservations-by-worker",
} as const;
