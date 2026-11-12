import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { REFUND_QUERY } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { RefundsTruncatedError } from "../RefundsTruncatedError";
import { fetchRefundsInRange } from "../fetchRefundsInRange";
import {
  BOTH_ROWS,
  BOTH_ROWS_COUNT,
  CRC_MOVEMENT,
  DAY_RANGE,
  MORE_ROWS_THAN_RETURNED,
  POSTGREST_ERROR,
  USD_MOVEMENT,
} from "./Refunds.constants";
import { RefundsQueryPage } from "./RefundsQuery.page";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("fetchRefundsInRange", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads the refunds table counting rows inside the half-open range", async () => {
    const page = RefundsQueryPage.respondingWith({
      data: [],
      error: null,
      count: 0,
    });

    await fetchRefundsInRange(DAY_RANGE);

    expect(page.from).toHaveBeenCalledWith(
      REFUND_QUERY.TABLE
    );
    expect(page.select).toHaveBeenCalledWith(
      REFUND_QUERY.SELECT,
      { count: REFUND_QUERY.COUNT }
    );
    expect(page.gte).toHaveBeenCalledWith(
      REFUND_QUERY.CREATED_AT_COLUMN,
      DAY_RANGE.startsAt
    );
    expect(page.lt).toHaveBeenCalledWith(
      REFUND_QUERY.CREATED_AT_COLUMN,
      DAY_RANGE.endsAt
    );
  });

  it("returns the mapped movements in the order received", async () => {
    RefundsQueryPage.respondingWith({
      data: BOTH_ROWS,
      error: null,
      count: BOTH_ROWS_COUNT,
    });

    await expect(
      fetchRefundsInRange(DAY_RANGE)
    ).resolves.toEqual([USD_MOVEMENT, CRC_MOVEMENT]);
  });

  it("returns an empty array when the range holds no refund", async () => {
    RefundsQueryPage.respondingWith({
      data: [],
      error: null,
      count: 0,
    });

    await expect(
      fetchRefundsInRange(DAY_RANGE)
    ).resolves.toEqual([]);
  });

  it("throws a RefundsTruncatedError when fewer rows arrive than the range holds", async () => {
    RefundsQueryPage.respondingWith({
      data: BOTH_ROWS,
      error: null,
      count: MORE_ROWS_THAN_RETURNED,
    });

    await expect(
      fetchRefundsInRange(DAY_RANGE)
    ).rejects.toBeInstanceOf(RefundsTruncatedError);
  });

  it("throws a RefundsTruncatedError when the response carries no row count", async () => {
    RefundsQueryPage.respondingWith({
      data: BOTH_ROWS,
      error: null,
      count: null,
    });

    await expect(
      fetchRefundsInRange(DAY_RANGE)
    ).rejects.toBeInstanceOf(RefundsTruncatedError);
  });

  it("throws a SupabaseQueryError when the query fails", async () => {
    RefundsQueryPage.respondingWith({
      data: BOTH_ROWS,
      error: POSTGREST_ERROR,
      count: null,
    });

    await expect(
      fetchRefundsInRange(DAY_RANGE)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
