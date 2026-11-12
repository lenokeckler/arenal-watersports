import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  RESERVATION_HISTORY_OPERATION,
  RESERVATION_HISTORY_QUERY,
  SUPABASE_TABLE,
} from "@/app/constants";
import { assertActiveWorkModeAccess } from "@/app/services/work-mode/assertActiveWorkModeAccess";
import { readReservationHistoryCategoryOptions } from "../readReservationHistoryCategoryOptions";
import {
  HISTORY_READ_ACCESS_REFUSED,
  HISTORY_READ_CATEGORY_FILTER_METHODS,
  HISTORY_READ_CATEGORY_RESPONSE,
  HISTORY_READ_CATEGORY_ROWS,
  HISTORY_READ_DATABASE_ERROR,
  HISTORY_READ_EMPTY_RESPONSE,
  HISTORY_READ_ERROR_RESPONSE,
  HISTORY_READ_SUPABASE_ERROR_NAME,
} from "./ReservationHistoryRead.constants";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));
vi.mock(
  "@/app/services/work-mode/assertActiveWorkModeAccess",
  () => ({ assertActiveWorkModeAccess: vi.fn() })
);

const from = vi.fn();
const queryBuilder = {
  eq: vi.fn(),
  filter: vi.fn(),
  in: vi.fn(),
  neq: vi.fn(),
  order: vi.fn(),
  select: vi.fn(),
};

describe("readReservationHistoryCategoryOptions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    from.mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.order.mockResolvedValue(
      HISTORY_READ_CATEGORY_RESPONSE
    );
    supabaseMocks.createServerSupabaseClient.mockResolvedValue(
      { from }
    );
  });

  it("asserts access before any database call", async () => {
    await readReservationHistoryCategoryOptions();

    expect(
      vi.mocked(assertActiveWorkModeAccess).mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      supabaseMocks.createServerSupabaseClient.mock
        .invocationCallOrder[0]
    );
  });

  it("reads ids and names ordered by name with no status filter", async () => {
    const options =
      await readReservationHistoryCategoryOptions();

    expect(from).toHaveBeenCalledWith(
      SUPABASE_TABLE.EQUIPMENT_CATEGORIES
    );
    expect(queryBuilder.select).toHaveBeenCalledWith(
      RESERVATION_HISTORY_QUERY.CATEGORY_OPTIONS.COLUMNS
    );
    expect(queryBuilder.order).toHaveBeenCalledWith(
      RESERVATION_HISTORY_QUERY.CATEGORY_OPTIONS.ORDER_BY
    );
    HISTORY_READ_CATEGORY_FILTER_METHODS.forEach((method) =>
      expect(queryBuilder[method]).not.toHaveBeenCalled()
    );
    expect(options).toStrictEqual(
      HISTORY_READ_CATEGORY_ROWS
    );
  });

  it("returns an empty list when there are no categories", async () => {
    queryBuilder.order.mockResolvedValue(
      HISTORY_READ_EMPTY_RESPONSE
    );

    await expect(
      readReservationHistoryCategoryOptions()
    ).resolves.toStrictEqual([]);
  });

  it("throws the database error with the options operation", async () => {
    queryBuilder.order.mockResolvedValue(
      HISTORY_READ_ERROR_RESPONSE
    );

    await expect(
      readReservationHistoryCategoryOptions()
    ).rejects.toMatchObject({
      cause: HISTORY_READ_DATABASE_ERROR,
      message: expect.stringContaining(
        RESERVATION_HISTORY_OPERATION.CATEGORY_OPTIONS
      ),
      name: HISTORY_READ_SUPABASE_ERROR_NAME,
    });
  });

  it("stops before the database when access is refused", async () => {
    vi.mocked(
      assertActiveWorkModeAccess
    ).mockRejectedValueOnce(HISTORY_READ_ACCESS_REFUSED);

    await expect(
      readReservationHistoryCategoryOptions()
    ).rejects.toBe(HISTORY_READ_ACCESS_REFUSED);
    expect(
      supabaseMocks.createServerSupabaseClient
    ).not.toHaveBeenCalled();
    expect(from).not.toHaveBeenCalled();
  });
});
