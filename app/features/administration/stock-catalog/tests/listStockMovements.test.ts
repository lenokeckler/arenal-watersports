import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { listStockMovements } from "../services/listStockMovements";
import {
  DEFAULT_STOCK_MOVEMENT_ITEM,
  DEFAULT_STOCK_MOVEMENT_ROW,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";

const SECOND_PAGE = 2;
const FIRST_PAGE_START = 0;

const mockFetchStockMovementCount = vi.fn();
const mockFetchStockMovements = vi.fn();

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({}),
}));

vi.mock("../services/fetchStockMovementCount", () => ({
  fetchStockMovementCount: (...args: unknown[]): unknown =>
    mockFetchStockMovementCount(...args),
}));

vi.mock("../services/fetchStockMovements", () => ({
  fetchStockMovements: (...args: unknown[]): unknown =>
    mockFetchStockMovements(...args),
}));

describe("listStockMovements", () => {
  beforeEach(() => {
    mockFetchStockMovementCount.mockReset();
    mockFetchStockMovements.mockReset();
    mockFetchStockMovements.mockResolvedValue([
      DEFAULT_STOCK_MOVEMENT_ROW,
    ]);
  });

  it("reads the first page range and maps the movements", async () => {
    mockFetchStockMovementCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE + 1
    );

    expect(
      await listStockMovements(
        FAKE_STOCK_CATEGORY_ID,
        LIST_PAGINATION.FIRST_PAGE
      )
    ).toEqual({
      movements: [DEFAULT_STOCK_MOVEMENT_ITEM],
      pageCount: SECOND_PAGE,
    });
    expect(mockFetchStockMovements).toHaveBeenCalledWith(
      expect.anything(),
      FAKE_STOCK_CATEGORY_ID,
      {
        from: FIRST_PAGE_START,
        to: LIST_PAGINATION.PAGE_SIZE - 1,
      }
    );
  });

  it("skips the page read when the page is past the last one", async () => {
    mockFetchStockMovementCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE
    );

    expect(
      await listStockMovements(
        FAKE_STOCK_CATEGORY_ID,
        SECOND_PAGE
      )
    ).toEqual({ movements: [], pageCount: 1 });
    expect(mockFetchStockMovements).not.toHaveBeenCalled();
  });

  it("returns no pages for a category without movements", async () => {
    mockFetchStockMovementCount.mockResolvedValue(0);

    expect(
      await listStockMovements(
        FAKE_STOCK_CATEGORY_ID,
        LIST_PAGINATION.FIRST_PAGE
      )
    ).toEqual({ movements: [], pageCount: 0 });
    expect(mockFetchStockMovements).not.toHaveBeenCalled();
  });
});
