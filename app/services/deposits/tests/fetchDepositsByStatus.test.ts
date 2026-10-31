import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DEPOSIT_QUERY } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { fetchDepositsByStatus } from "../fetchDepositsByStatus";
import {
  CRC_DEPOSIT_ITEM,
  CRC_DEPOSIT_ROW,
  MULTIPLE_STATUSES,
  POSTGREST_ERROR,
  USD_DEPOSIT_ITEM,
  USD_DEPOSIT_ROW,
} from "./Deposits.constants";
import { DepositsQueryPage } from "./DepositsQuery.page";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("fetchDepositsByStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads the deposits table with the select, status filter and oldest-first order", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    await fetchDepositsByStatus({
      statuses: MULTIPLE_STATUSES,
    });

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
    expect(page.order).toHaveBeenCalledWith(
      DEPOSIT_QUERY.ORDER_COLUMN,
      { ascending: true }
    );
  });

  it("returns the mapped items in the order received", async () => {
    DepositsQueryPage.respondingWith({
      data: [USD_DEPOSIT_ROW, CRC_DEPOSIT_ROW],
      error: null,
    });

    const items = await fetchDepositsByStatus({
      statuses: MULTIPLE_STATUSES,
    });

    expect(items).toEqual([
      USD_DEPOSIT_ITEM,
      CRC_DEPOSIT_ITEM,
    ]);
  });

  it("returns an empty array when no deposit matches", async () => {
    DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    const items = await fetchDepositsByStatus({
      statuses: MULTIPLE_STATUSES,
    });

    expect(items).toEqual([]);
  });

  it("throws a SupabaseQueryError when the query fails", async () => {
    DepositsQueryPage.respondingWith({
      data: null,
      error: POSTGREST_ERROR,
    });

    await expect(
      fetchDepositsByStatus({ statuses: MULTIPLE_STATUSES })
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });

  it("does not return data when the query fails", async () => {
    DepositsQueryPage.respondingWith({
      data: [USD_DEPOSIT_ROW],
      error: POSTGREST_ERROR,
    });

    await expect(
      fetchDepositsByStatus({ statuses: MULTIPLE_STATUSES })
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });

  it("returns an empty array without creating a client when no status is requested", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    const items = await fetchDepositsByStatus({
      statuses: [],
    });

    expect(items).toEqual([]);
    expect(page.clientCreations).toBe(0);
  });
});
