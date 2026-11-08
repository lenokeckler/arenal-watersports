import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_CATEGORY_TRACKING_MODE } from "../constants/StockCategoryTrackingMode.constants";
import { getStockCategory } from "../services/getStockCategory";
import { getStockLevels } from "../services/getStockLevels";
import { listStockMovements } from "../services/listStockMovements";
import StockCount from "../StockCount";
import {
  DEFAULT_STOCK_CATEGORY,
  DEFAULT_STOCK_LEVELS,
  DEFAULT_STOCK_MOVEMENT_ITEM,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";
import {
  NOT_FOUND_ERROR_MESSAGE,
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

describe("StockCount", () => {
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

  it("redirects a worker who is not an administrator home without reading the category", async () => {
    mockedAdministratorCheck.mockResolvedValue(false);

    await expect(renderStockCount()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(getStockCategory).not.toHaveBeenCalled();
  });

  it.each([
    ["does not exist", null],
    [
      "is counted by unit",
      {
        ...DEFAULT_STOCK_CATEGORY,
        trackingMode: STOCK_CATEGORY_TRACKING_MODE.BY_UNIT,
      },
    ],
  ])(
    "shows not found when the category %s",
    async (_name, category) => {
      mockedCategoryRead.mockResolvedValue(category);

      await expect(renderStockCount()).rejects.toThrow(
        NOT_FOUND_ERROR_MESSAGE
      );

      expect(getStockLevels).not.toHaveBeenCalled();
    }
  );

  it("shows the view in its error state when the category read fails", async () => {
    mockedCategoryRead.mockRejectedValue(
      new Error("category read failed")
    );

    const element = await renderStockCount();

    expect(element.props).toMatchObject({
      category: {
        id: FAKE_STOCK_CATEGORY_ID,
        name: STOCK_COUNT_COPY.UNREADABLE_CATEGORY_NAME,
      },
      fetchFailed: true,
      movements: [],
    });
    expect(notFoundMock).not.toHaveBeenCalled();
    expect(getStockLevels).not.toHaveBeenCalled();
  });

  it("passes the category, the levels and the movements to the view", async () => {
    const element = await renderStockCount();

    expect(element.props).toMatchObject({
      category: DEFAULT_STOCK_CATEGORY,
      fetchFailed: false,
      levels: DEFAULT_STOCK_LEVELS,
      movements: [DEFAULT_STOCK_MOVEMENT_ITEM],
    });
  });
});
