import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DEPOSIT_QUERY } from "@/app/constants";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { fetchDepositsByStatus } from "../fetchDepositsByStatus";
import {
  CRC_DEPOSIT_ITEM,
  CRC_DEPOSIT_ROW,
  FIRST_PAGE_RANGE,
  MULTIPLE_STATUSES,
  POSTGREST_ERROR,
  TWO_DEPOSITS_COUNT,
  USD_DEPOSIT_ITEM,
  USD_DEPOSIT_ROW,
} from "./Deposits.constants";
import { DepositsQueryPage } from "./DepositsQuery.page";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const FIRST_PAGE_QUERY = {
  page: LIST_PAGINATION.FIRST_PAGE,
  statuses: MULTIPLE_STATUSES,
};

describe("fetchDepositsByStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads one page of the deposits table with the select, status filter and oldest-first order", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    await fetchDepositsByStatus(FIRST_PAGE_QUERY);

    expect(page.from).toHaveBeenCalledWith(
      DEPOSIT_QUERY.TABLE
    );
    expect(page.select).toHaveBeenCalledWith(
      DEPOSIT_QUERY.SELECT,
      { count: DEPOSIT_QUERY.COUNT }
    );
    expect(page.inFilter).toHaveBeenCalledWith(
      DEPOSIT_QUERY.STATUS_COLUMN,
      [...MULTIPLE_STATUSES]
    );
    expect(page.order).toHaveBeenNthCalledWith(
      1,
      DEPOSIT_QUERY.ORDER_COLUMN,
      { ascending: true }
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

  it("returns the mapped items in the order received with the page totals", async () => {
    DepositsQueryPage.respondingWith({
      data: [USD_DEPOSIT_ROW, CRC_DEPOSIT_ROW],
      error: null,
    });

    expect(
      await fetchDepositsByStatus(FIRST_PAGE_QUERY)
    ).toEqual({
      items: [USD_DEPOSIT_ITEM, CRC_DEPOSIT_ITEM],
      page: LIST_PAGINATION.FIRST_PAGE,
      pageCount: LIST_PAGINATION.FIRST_PAGE,
      totalCount: TWO_DEPOSITS_COUNT,
    });
  });

  it("returns no items when no deposit matches", async () => {
    DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    const { items } = await fetchDepositsByStatus(
      FIRST_PAGE_QUERY
    );

    expect(items).toEqual([]);
  });

  it("throws a SupabaseQueryError when the query fails", async () => {
    DepositsQueryPage.respondingWith({
      data: null,
      error: POSTGREST_ERROR,
    });

    await expect(
      fetchDepositsByStatus(FIRST_PAGE_QUERY)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });

  it("does not return data when the query fails", async () => {
    DepositsQueryPage.respondingWith({
      data: [USD_DEPOSIT_ROW],
      error: POSTGREST_ERROR,
    });

    await expect(
      fetchDepositsByStatus(FIRST_PAGE_QUERY)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });

  it("returns an empty page without creating a client when no status is requested", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    const { items, pageCount } =
      await fetchDepositsByStatus({
        page: LIST_PAGINATION.FIRST_PAGE,
        statuses: [],
      });

    expect(items).toEqual([]);
    expect(pageCount).toBe(0);
    expect(page.clientCreations).toBe(0);
  });
});
