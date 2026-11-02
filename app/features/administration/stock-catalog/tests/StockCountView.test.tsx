import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_EMPTY_LEVELS } from "../constants/StockEmptyLevels.constants";
import { STOCK_REASON_COPY } from "../constants/StockReasonCopy.constants";
import { DEFAULT_STOCK_CATEGORY } from "./Stock.constants";
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

const TITLE = `${STOCK_COUNT_COPY.TITLE_PREFIX} ${DEFAULT_STOCK_CATEGORY.name}`;

describe("StockCountView", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("titles the screen with the category and links back to the category list", () => {
    const page = renderStockCountView();

    expect(page.getHeading(TITLE)).toBeInTheDocument();
    expect(page.getBackLink()).toBeInTheDocument();
  });

  it("shows the three counts as editable fields with their sum as the total", () => {
    const page = renderStockCountView();

    expect(
      page.getQuantityInput(
        STOCK_COUNT_COPY.AVAILABLE_LABEL
      )
    ).toHaveValue("10");
    expect(
      page.getQuantityInput(STOCK_COUNT_COPY.DAMAGED_LABEL)
    ).toHaveValue("2");
    expect(
      page.getQuantityInput(
        STOCK_COUNT_COPY.IN_REPAIR_LABEL
      )
    ).toHaveValue("1");
    expect(page.getSummaryTotal()).toHaveTextContent("13");
  });

  it("offers the four reasons in Spanish", () => {
    const page = renderStockCountView();

    expect(page.getReasonOptionLabels()).toEqual(
      Object.values(STOCK_ADJUSTMENT_REASON).map(
        (reason) => STOCK_REASON_COPY[reason]
      )
    );
  });

  it("preselects the initial count when the category has no count yet", () => {
    const page = renderStockCountView({
      levels: STOCK_EMPTY_LEVELS,
      movements: [],
    });

    expect(
      page.getControl(STOCK_COUNT_COPY.REASON_LABEL)
    ).toHaveValue(STOCK_ADJUSTMENT_REASON.INITIAL_COUNT);
  });

  it("preselects a count correction when units are registered but no movement exists", () => {
    const page = renderStockCountView({ movements: [] });

    expect(
      page.getControl(STOCK_COUNT_COPY.REASON_LABEL)
    ).toHaveValue(STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION);
  });

  it("preselects a count correction when the category already has history", () => {
    const page = renderStockCountView();

    expect(
      page.getControl(STOCK_COUNT_COPY.REASON_LABEL)
    ).toHaveValue(STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION);
  });

  it("shows the expiry date only when the category has an expiry alert", () => {
    const withAlert = renderStockCountView();

    expect(
      withAlert.queryControl(
        STOCK_COUNT_COPY.EXPIRY_DATE_LABEL
      )
    ).toBeInTheDocument();
  });

  it("hides the expiry date when the category has no expiry alert", () => {
    const page = renderStockCountView({
      category: {
        ...DEFAULT_STOCK_CATEGORY,
        hasExpiryAlert: false,
      },
    });

    expect(
      page.queryControl(STOCK_COUNT_COPY.EXPIRY_DATE_LABEL)
    ).not.toBeInTheDocument();
  });
});
