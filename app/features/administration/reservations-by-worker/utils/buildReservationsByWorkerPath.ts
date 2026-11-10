import { PAGINATION, PATHS } from "@/app/constants";

export const buildReservationsByWorkerPath = (
  pageIndex: number
): string =>
  `${PATHS.ADMINISTRATION.RESERVATIONS_BY_WORKER}?${PAGINATION.QUERY_PARAMS.PAGE}=${pageIndex}`;
