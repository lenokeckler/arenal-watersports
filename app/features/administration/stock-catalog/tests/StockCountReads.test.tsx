import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { STOCK_EMPTY_LEVELS } from "../constants/StockEmptyLevels.constants";
import { getStockCategory } from "../services/getStockCategory";
import { getStockLevels } from "../services/getStockLevels";
import { listStockMovements } from "../services/listStockMovements";
import StockCount from "../StockCount";
import { resolveCategoryStockPath } from "../utils/resolveStockPaths";
import {
  DEFAULT_STOCK_CATEGORY,
  DEFAULT_STOCK_LEVELS,
  DEFAULT_STOCK_MOVEMENT_ITEM,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";
import {
  LAST_PAGE_COUNT,
  MIDDLE_PAGE,
  MIDDLE_PAGE_COUNT,
  NOT_FOUND_ERROR_MESSAGE,
  PAGE_PAST_THE_END,
  REDIRECT_ERROR_MESSAGE,
  throwNavigation,
} from "./StockCount.constants";

const mockedAdministratorCheck = vi.mocked(
  isAdministratorSignedIn
);
const mockedCategoryRead = vi.mocked(getStockCategory);
const mockedLevelsRead = vi.mocked(getStockLevels);
const mockedMovementsRead = vi.mocked(listStockMovements);

const redirectMock = vi.hoisted(() => vi.fn());
const notFoundMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
  notFound: notFoundMock,
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/getStockCategory");
vi.mock("../services/getStockLevels");
vi.mock("../services/listStockMovements");

const renderStockCount = (pageParam?: string) =>
  StockCount({
    categoryId: FAKE_STOCK_CATEGORY_ID,
    pageParam,
  });

describe("StockCount reads", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation(
      throwNavigation(REDIRECT_ERROR_MESSAGE)
    );
    notFoundMock.mockImplementation(
      throwNavigation(NOT_FOUND_ERROR_MESSAGE)
    );
    mockedAdministratorCheck.mockResolvedValue(true);
    mockedCategoryRead.mockResolvedValue(
      DEFAULT_STOCK_CATEGORY
    );
    mockedLevelsRead.mockResolvedValue(
      DEFAULT_STOCK_LEVELS
    );
    mockedMovementsRead.mockResolvedValue({
      movements: [DEFAULT_STOCK_MOVEMENT_ITEM],
      pageCount: 1,
    });
  });

  it("reads the page named in the address", async () => {
    mockedMovementsRead.mockResolvedValue({
      movements: [DEFAULT_STOCK_MOVEMENT_ITEM],
      pageCount: MIDDLE_PAGE_COUNT,
    });

    const element = await renderStockCount(
      `${MIDDLE_PAGE}`
    );

    expect(listStockMovements).toHaveBeenCalledWith(
      FAKE_STOCK_CATEGORY_ID,
      MIDDLE_PAGE
    );
    expect(element.props.currentPage).toBe(MIDDLE_PAGE);
  });

  it("flags a failed read with empty levels when the data cannot be loaded", async () => {
    mockedMovementsRead.mockRejectedValue(
      new Error("read failed")
    );

    const element = await renderStockCount();

    expect(element.props).toMatchObject({
      fetchFailed: true,
      levels: STOCK_EMPTY_LEVELS,
      movements: [],
    });
  });

  it("redirects a page past the end to the last page", async () => {
    mockedMovementsRead.mockResolvedValue({
      movements: [],
      pageCount: LAST_PAGE_COUNT,
    });

    await expect(
      renderStockCount(PAGE_PAST_THE_END)
    ).rejects.toThrow(REDIRECT_ERROR_MESSAGE);

    expect(redirectMock).toHaveBeenCalledWith(
      resolveListPageHref(
        resolveCategoryStockPath(FAKE_STOCK_CATEGORY_ID),
        LAST_PAGE_COUNT
      )
    );
  });
});
