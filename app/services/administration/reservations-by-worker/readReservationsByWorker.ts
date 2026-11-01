import {
  PAGINATION,
  RESERVATIONS_BY_WORKER_OPERATION,
  RESERVATIONS_BY_WORKER_QUERY,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { isSignedInAdministrator } from "@/app/services/worker-registration/isSignedInAdministrator";
import type { ReservationByWorker } from "./models/ReservationByWorker.interface";
import type { ReservationsByWorkerPage } from "./models/ReservationsByWorkerPage.interface";

const readPage = (
  supabase: Awaited<
    ReturnType<typeof createServerSupabaseClient>
  >,
  pageIndex: number
) => {
  const from = pageIndex * PAGINATION.DEFAULT_PAGE_SIZE;
  const to =
    from +
    PAGINATION.DEFAULT_PAGE_SIZE -
    PAGINATION.ONE_PAGE;

  return supabase
    .from(RESERVATIONS_BY_WORKER_QUERY.TABLE)
    .select(RESERVATIONS_BY_WORKER_QUERY.PROJECTION, {
      count: RESERVATIONS_BY_WORKER_QUERY.COUNT,
    })
    .order(
      RESERVATIONS_BY_WORKER_QUERY.ORDER_BY.CREATED_AT,
      {
        ascending: false,
      }
    )
    .order(RESERVATIONS_BY_WORKER_QUERY.ORDER_BY.ID, {
      ascending: true,
    })
    .range(from, to);
};

const mapReservations = (
  rows: Awaited<ReturnType<typeof readPage>>["data"]
): ReservationByWorker[] =>
  (rows ?? []).map((row) => ({
    code: row.code,
    customerName: row.customer_name,
    id: row.id,
    workerName: row.worker.full_name,
  }));

const buildPage = (
  rows: Awaited<ReturnType<typeof readPage>>["data"],
  totalCount: NullableRef<number>,
  pageIndex: number
): ReservationsByWorkerPage => {
  const resolvedTotalCount =
    totalCount ?? PAGINATION.ZERO_RESULTS;
  const pageCount = Math.max(
    PAGINATION.ONE_PAGE,
    Math.ceil(
      resolvedTotalCount / PAGINATION.DEFAULT_PAGE_SIZE
    )
  );

  return {
    items: mapReservations(rows),
    pageCount,
    pageIndex,
    totalCount: resolvedTotalCount,
  };
};

const readLastAvailablePage = async (
  supabase: Awaited<
    ReturnType<typeof createServerSupabaseClient>
  >
): Promise<ReservationsByWorkerPage> => {
  const firstPage = await readPage(
    supabase,
    PAGINATION.DEFAULT_PAGE
  );
  throwIfSupabaseError(
    firstPage.error,
    RESERVATIONS_BY_WORKER_OPERATION
  );
  const lastPageIndex = Math.max(
    PAGINATION.DEFAULT_PAGE,
    Math.ceil(
      (firstPage.count ?? PAGINATION.ZERO_RESULTS) /
        PAGINATION.DEFAULT_PAGE_SIZE
    ) - PAGINATION.ONE_PAGE
  );
  const lastPage = await readPage(supabase, lastPageIndex);
  throwIfSupabaseError(
    lastPage.error,
    RESERVATIONS_BY_WORKER_OPERATION
  );

  return buildPage(
    lastPage.data,
    firstPage.count,
    lastPageIndex
  );
};

export const readReservationsByWorker = async (
  requestedPageIndex: number
): Promise<NullableRef<ReservationsByWorkerPage>> => {
  const supabase = await createServerSupabaseClient();

  if (!(await isSignedInAdministrator(supabase))) {
    return null;
  }

  const response = await readPage(
    supabase,
    requestedPageIndex
  );

  if (
    response.error?.code ===
    RESERVATIONS_BY_WORKER_QUERY.OUT_OF_RANGE_ERROR
  ) {
    return readLastAvailablePage(supabase);
  }

  throwIfSupabaseError(
    response.error,
    RESERVATIONS_BY_WORKER_OPERATION
  );

  return buildPage(
    response.data,
    response.count,
    requestedPageIndex
  );
};
