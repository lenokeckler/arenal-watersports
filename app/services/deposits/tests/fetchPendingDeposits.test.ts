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
import { fetchPendingDeposits } from "../fetchPendingDeposits";
import {
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
    await fetchPendingDeposits();
    expect(page.inFilter).toHaveBeenCalledWith(
      DEPOSIT_QUERY.STATUS_COLUMN,
      [DEPOSIT_STATUS.HELD]
    );
  });
  it("returns the mapped held deposits", async () => {
    DepositsQueryPage.respondingWith({
      data: [USD_DEPOSIT_ROW],
      error: null,
    });
    expect(await fetchPendingDeposits()).toEqual([
      USD_DEPOSIT_ITEM,
    ]);
  });
});
