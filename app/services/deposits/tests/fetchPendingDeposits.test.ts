import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  DEPOSIT_QUERY,
  DEPOSIT_STATUS,
} from "@/app/constants";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { fetchPendingDeposits } from "../fetchPendingDeposits";
import {
  SECOND_PAGE,
  SECOND_PAGE_RANGE,
  USD_DEPOSIT_ITEM,
  USD_DEPOSIT_ROW,
} from "./Deposits.constants";
import { DepositsQueryPage } from "./DepositsQuery.page";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("fetchPendingDeposits", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("filters only the held status", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    await fetchPendingDeposits(LIST_PAGINATION.FIRST_PAGE);

    expect(page.inFilter).toHaveBeenCalledWith(
      DEPOSIT_QUERY.STATUS_COLUMN,
      [DEPOSIT_STATUS.HELD]
    );
  });

  it("reads the range of the requested page", async () => {
    const page = DepositsQueryPage.respondingWith({
      data: [],
      error: null,
    });

    await fetchPendingDeposits(SECOND_PAGE);

    expect(page.range).toHaveBeenCalledWith(
      SECOND_PAGE_RANGE.from,
      SECOND_PAGE_RANGE.to
    );
  });

  it("returns the mapped held deposits", async () => {
    DepositsQueryPage.respondingWith({
      data: [USD_DEPOSIT_ROW],
      error: null,
    });

    const { items } = await fetchPendingDeposits(
      LIST_PAGINATION.FIRST_PAGE
    );

    expect(items).toEqual([USD_DEPOSIT_ITEM]);
  });
});
