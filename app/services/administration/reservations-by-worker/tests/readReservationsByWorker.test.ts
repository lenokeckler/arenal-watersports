import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PAGINATION,
  RESERVATIONS_BY_WORKER_QUERY,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readReservationsByWorker } from "../readReservationsByWorker";
import {
  RESERVATIONS_BY_WORKER_OUT_OF_RANGE,
  RESERVATIONS_BY_WORKER_TEST_PAGE,
  RESERVATIONS_BY_WORKER_TEST_ROW,
} from "./ReservationsByWorkerRead.constants";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));

const rpc = vi.fn();
const from = vi.fn();
const queryBuilder = {
  select: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn(),
};

const resetMocks = (): void => {
  vi.clearAllMocks();
  rpc.mockResolvedValue({ data: true, error: null });
  from.mockReturnValue(queryBuilder);
  queryBuilder.range.mockResolvedValue(
    RESERVATIONS_BY_WORKER_TEST_PAGE
  );
  supabaseMocks.createServerSupabaseClient.mockResolvedValue(
    { from, rpc } as unknown as Awaited<
      ReturnType<typeof createServerSupabaseClient>
    >
  );
};

describe("readReservationsByWorker", () => {
  beforeEach(resetMocks);

  it("reads the creator name in a stable paginated range", async () => {
    const pageIndex = PAGINATION.ONE_PAGE;
    const rangeStart =
      pageIndex * PAGINATION.DEFAULT_PAGE_SIZE;
    const rangeEnd =
      rangeStart +
      PAGINATION.DEFAULT_PAGE_SIZE -
      PAGINATION.ONE_PAGE;
    const page = await readReservationsByWorker(pageIndex);

    expect(from).toHaveBeenCalledWith(
      RESERVATIONS_BY_WORKER_QUERY.TABLE
    );
    expect(queryBuilder.select).toHaveBeenCalledWith(
      RESERVATIONS_BY_WORKER_QUERY.PROJECTION,
      { count: RESERVATIONS_BY_WORKER_QUERY.COUNT }
    );
    expect(queryBuilder.order).toHaveBeenNthCalledWith(
      PAGINATION.ONE_PAGE,
      RESERVATIONS_BY_WORKER_QUERY.ORDER_BY.CREATED_AT,
      { ascending: false }
    );
    expect(queryBuilder.order).toHaveBeenNthCalledWith(
      PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE,
      RESERVATIONS_BY_WORKER_QUERY.ORDER_BY.ID,
      { ascending: true }
    );
    expect(queryBuilder.range).toHaveBeenCalledWith(
      rangeStart,
      rangeEnd
    );
    expect(page).toMatchObject({
      items: [
        {
          code: RESERVATIONS_BY_WORKER_TEST_ROW.code,
          workerName:
            RESERVATIONS_BY_WORKER_TEST_ROW.worker
              .full_name,
        },
      ],
      pageCount: PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE,
      pageIndex,
      totalCount: RESERVATIONS_BY_WORKER_TEST_PAGE.count,
    });
  });

  it("does not query reservations for a non-administrator", async () => {
    rpc.mockResolvedValue({ data: false, error: null });

    await expect(
      readReservationsByWorker(PAGINATION.DEFAULT_PAGE)
    ).resolves.toBeNull();
    expect(from).not.toHaveBeenCalled();
  });

  it("moves an out-of-range request to the last page", async () => {
    const requestedPageIndex =
      PAGINATION.DEFAULT_PAGE_SIZE *
      PAGINATION.DEFAULT_PAGE_SIZE;
    const requestedRangeStart =
      requestedPageIndex * PAGINATION.DEFAULT_PAGE_SIZE;
    const requestedRangeEnd =
      requestedRangeStart +
      PAGINATION.DEFAULT_PAGE_SIZE -
      PAGINATION.ONE_PAGE;
    queryBuilder.range
      .mockResolvedValueOnce({
        count: null,
        data: null,
        error: RESERVATIONS_BY_WORKER_OUT_OF_RANGE,
      })
      .mockResolvedValueOnce({
        ...RESERVATIONS_BY_WORKER_TEST_PAGE,
        data: [],
      })
      .mockResolvedValueOnce(
        RESERVATIONS_BY_WORKER_TEST_PAGE
      );

    const page = await readReservationsByWorker(
      requestedPageIndex
    );

    expect(page?.pageIndex).toBe(PAGINATION.ONE_PAGE);
    expect(queryBuilder.range).toHaveBeenNthCalledWith(
      PAGINATION.ONE_PAGE,
      requestedRangeStart,
      requestedRangeEnd
    );
  });
});
