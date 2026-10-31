import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  DEPOSIT_QUERY,
  RETAINED_DEPOSIT_STATUSES,
} from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { fetchRetainedDeposits } from "../fetchRetainedDeposits";
import { POSTGREST_ERROR } from "./Deposits.constants";
import { DepositsQueryPage } from "./DepositsQuery.page";
import {
  PARTIAL_CRC_ITEM,
  PARTIAL_CRC_ROW,
  RETAINED_USD_ITEM,
  RETAINED_USD_ROW,
} from "./RetainedDeposits.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("fetchRetainedDeposits", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads the retained select requesting the exact count", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    await fetchRetainedDeposits();

    expect(page.from).toHaveBeenCalledWith(
      DEPOSIT_QUERY.TABLE
    );
    expect(page.select).toHaveBeenCalledWith(
      DEPOSIT_QUERY.RETAINED_SELECT,
      { count: DEPOSIT_QUERY.COUNT }
    );
  });

  it("filters both retained statuses", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    await fetchRetainedDeposits();

    expect(page.inFilter).toHaveBeenCalledWith(
      DEPOSIT_QUERY.STATUS_COLUMN,
      [...RETAINED_DEPOSIT_STATUSES]
    );
  });

  it("orders by resolution date, newest first, with unresolved rows last", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    await fetchRetainedDeposits();

    expect(page.order).toHaveBeenCalledTimes(2);
    expect(page.order).toHaveBeenNthCalledWith(
      1,
      DEPOSIT_QUERY.RESOLVED_AT_COLUMN,
      { ascending: false, nullsFirst: false }
    );
    expect(page.order).toHaveBeenNthCalledWith(
      2,
      DEPOSIT_QUERY.ID_COLUMN,
      { ascending: true }
    );
  });

  it("returns the mapped items with the retained amount and no deposit amount", async () => {
    DepositsQueryPage.respondingWith({
      data: [RETAINED_USD_ROW, PARTIAL_CRC_ROW],
      error: null,
    });

    const items = await fetchRetainedDeposits();

    expect(items).toEqual([
      RETAINED_USD_ITEM,
      PARTIAL_CRC_ITEM,
    ]);
    items.forEach((item) =>
      expect(item).not.toHaveProperty("amount")
    );
  });

  it("returns an empty array when nothing was retained", async () => {
    DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    expect(await fetchRetainedDeposits()).toEqual([]);
  });

  it("throws a SupabaseQueryError when the query fails", async () => {
    DepositsQueryPage.respondingWith({
      data: null,
      error: POSTGREST_ERROR,
    });

    await expect(
      fetchRetainedDeposits()
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
