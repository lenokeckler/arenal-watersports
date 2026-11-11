import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { listExtras } from "../services/listExtras";
import {
  DEFAULT_EXTRA,
  DEFAULT_EXTRA_ROW,
} from "./Extra.constants";

const mockFetchExtraCount = vi.fn();
const mockFetchExtras = vi.fn();

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({}),
}));

vi.mock("../services/fetchExtraCount", () => ({
  fetchExtraCount: (...args: unknown[]): unknown =>
    mockFetchExtraCount(...args),
}));

vi.mock("../services/fetchExtras", () => ({
  fetchExtras: (...args: unknown[]): unknown =>
    mockFetchExtras(...args),
}));

describe("listExtras", () => {
  beforeEach(() => {
    mockFetchExtraCount.mockReset();
    mockFetchExtras.mockReset();
    mockFetchExtras.mockResolvedValue([DEFAULT_EXTRA_ROW]);
  });

  it("asks for the row range of the requested page", async () => {
    mockFetchExtraCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE * 2
    );

    await listExtras(2);

    expect(mockFetchExtras).toHaveBeenCalledWith(
      expect.anything(),
      {
        from: LIST_PAGINATION.PAGE_SIZE,
        to: LIST_PAGINATION.PAGE_SIZE * 2 - 1,
      }
    );
  });

  it("returns the mapped extras with the page and total counts", async () => {
    mockFetchExtraCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE + 1
    );

    const result = await listExtras(
      LIST_PAGINATION.FIRST_PAGE
    );

    expect(result).toEqual({
      extras: [DEFAULT_EXTRA],
      pageCount: 2,
      totalCount: LIST_PAGINATION.PAGE_SIZE + 1,
    });
  });

  it.each([0, -1])(
    "reads no rows when the page is %s",
    async (page) => {
      mockFetchExtraCount.mockResolvedValue(
        LIST_PAGINATION.PAGE_SIZE
      );

      const result = await listExtras(page);

      expect(result.extras).toEqual([]);
      expect(mockFetchExtras).not.toHaveBeenCalled();
    }
  );

  it("reads no rows when the page is past the end", async () => {
    mockFetchExtraCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE
    );

    const result = await listExtras(9);

    expect(result).toEqual({
      extras: [],
      pageCount: 1,
      totalCount: LIST_PAGINATION.PAGE_SIZE,
    });
    expect(mockFetchExtras).not.toHaveBeenCalled();
  });

  it("rejects when a read fails instead of returning a partial page", async () => {
    mockFetchExtraCount.mockResolvedValue(1);
    mockFetchExtras.mockRejectedValue(
      new Error("read failed")
    );

    await expect(
      listExtras(LIST_PAGINATION.FIRST_PAGE)
    ).rejects.toThrow("read failed");
  });
});
