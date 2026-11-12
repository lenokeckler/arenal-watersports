import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { buildStockMovementCard } from "../utils/buildStockMovementCard";
import { resolveCategoryStockPath } from "../utils/resolveStockPaths";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import {
  DEFAULT_STOCK_MOVEMENT_ITEM,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";
import {
  MIDDLE_PAGE,
  MIDDLE_PAGE_COUNT,
} from "./StockCount.constants";
import { renderStockCountView } from "./renderStockCountView";

const refreshMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/adjustStockAction", () => ({
  adjustStockAction: vi.fn(),
}));

describe("StockCountView history and read states", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("lists each count in the history with its date, reason and from to values", () => {
    const page = renderStockCountView();
    const card = buildStockMovementCard(
      DEFAULT_STOCK_MOVEMENT_ITEM
    );

    const content = page.getHistoryCardContent(
      card.dateText
    );

    expect(
      content.getByText(card.reasonLabel)
    ).toBeInTheDocument();
    expect(
      content.getByText(card.totalText)
    ).toBeInTheDocument();
    expect(
      content.getByText(card.changesText)
    ).toBeInTheDocument();
  });

  it("shows the empty history state when nothing was counted yet", () => {
    const page = renderStockCountView({ movements: [] });

    expect(
      page.getHeading(STOCK_COUNT_COPY.HISTORY_EMPTY_TITLE)
    ).toBeInTheDocument();
  });

  it("shows the read error instead of the form and refreshes on retry", async () => {
    const page = renderStockCountView({
      fetchFailed: true,
      movements: [],
    });

    expect(
      page.getText(STOCK_COUNT_COPY.FETCH_ERROR_MESSAGE)
    ).toBeInTheDocument();
    expect(
      page.queryControl(STOCK_COUNT_COPY.AVAILABLE_LABEL)
    ).not.toBeInTheDocument();
    await page.clickRetry();

    expect(refreshMock).toHaveBeenCalledTimes(1);
  });

  it("links to the previous and next pages of the history", () => {
    const page = renderStockCountView({
      currentPage: MIDDLE_PAGE,
      pageCount: MIDDLE_PAGE_COUNT,
    });
    const basePath = resolveCategoryStockPath(
      FAKE_STOCK_CATEGORY_ID
    );

    expect(page.getPreviousLink()).toHaveAttribute(
      "href",
      resolveListPageHref(basePath, MIDDLE_PAGE - 1)
    );
    expect(page.getNextLink()).toHaveAttribute(
      "href",
      resolveListPageHref(basePath, MIDDLE_PAGE + 1)
    );
  });
});
