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
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { fetchRetainedDeposits } from "../fetchRetainedDeposits";
import {
  FIRST_PAGE_RANGE,
  POSTGREST_ERROR,
} from "./Deposits.constants";
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

const fetchFirstPage = () =>
  fetchRetainedDeposits(LIST_PAGINATION.FIRST_PAGE);

describe("fetchRetainedDeposits", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads the retained select with the exact count and both retained statuses", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    await fetchFirstPage();

    expect(page.from).toHaveBeenCalledWith(
      DEPOSIT_QUERY.TABLE
    );
    expect(page.select).toHaveBeenCalledWith(
      DEPOSIT_QUERY.RETAINED_SELECT,
      { count: DEPOSIT_QUERY.COUNT }
    );
    expect(page.inFilter).toHaveBeenCalledWith(
      DEPOSIT_QUERY.STATUS_COLUMN,
      [...RETAINED_DEPOSIT_STATUSES]
    );
  });

  it("orders by resolution date, newest first, with unresolved rows last, and reads one page", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    await fetchFirstPage();

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
    expect(page.range).toHaveBeenCalledWith(
      FIRST_PAGE_RANGE.from,
      FIRST_PAGE_RANGE.to
    );
  });

  it("returns the mapped items with the retained amount and no deposit amount", async () => {
    DepositsQueryPage.respondingWith({
      data: [RETAINED_USD_ROW, PARTIAL_CRC_ROW],
      error: null,
    });

    const items = (await fetchFirstPage())?.items ?? [];

    expect(items).toEqual([
      RETAINED_USD_ITEM,
      PARTIAL_CRC_ITEM,
    ]);
    items.forEach((item) =>
      expect(item).not.toHaveProperty("amount")
    );
  });

  it("returns no items when nothing was retained", async () => {
    DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    expect((await fetchFirstPage())?.items).toEqual([]);
  });

  it("returns null without reading deposits when the worker is not an administrator", async () => {
    const page = DepositsQueryPage.forNonAdministrator();

    expect(await fetchFirstPage()).toBeNull();
    expect(page.from).not.toHaveBeenCalled();
  });

  it("throws a SupabaseQueryError when the query fails", async () => {
    DepositsQueryPage.respondingWith({
      data: null,
      error: POSTGREST_ERROR,
    });

    await expect(fetchFirstPage()).rejects.toBeInstanceOf(
      SupabaseQueryError
    );
  });
});
