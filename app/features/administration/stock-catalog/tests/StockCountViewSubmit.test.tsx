import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { waitFor } from "@testing-library/react";
import { STATUS } from "@/app/constants";
import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
import { STOCK_EMPTY_LEVELS } from "../constants/StockEmptyLevels.constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import {
  DEFAULT_STOCK_LEVELS,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";
import {
  SAVE_SUCCESS_RESULT,
  TYPED_AVAILABLE,
  TYPED_EXPIRY_DATE,
} from "./StockCount.constants";
import { renderStockCountView } from "./renderStockCountView";

const mocks = vi.hoisted(() => ({
  adjust: vi.fn(),
  refresh: vi.fn(),
  showToast: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mocks.refresh }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mocks.showToast }),
}));

vi.mock("../services/adjustStockAction", () => ({
  adjustStockAction: mocks.adjust,
}));

describe("StockCountView submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.adjust.mockResolvedValue(SAVE_SUCCESS_RESULT);
  });

  it("sends the typed counts with the chosen reason, then toasts and refreshes", async () => {
    const page = renderStockCountView();

    await page.setQuantity(
      STOCK_COUNT_COPY.AVAILABLE_LABEL,
      TYPED_AVAILABLE
    );
    await page.selectReason(STOCK_ADJUSTMENT_REASON.LOST);
    await page.submit();

    await waitFor(() => {
      expect(mocks.refresh).toHaveBeenCalledTimes(1);
    });
    expect(mocks.adjust).toHaveBeenCalledWith({
      available: Number(TYPED_AVAILABLE),
      categoryId: FAKE_STOCK_CATEGORY_ID,
      damaged: DEFAULT_STOCK_LEVELS.damaged,
      expiryDate: null,
      inRepair: DEFAULT_STOCK_LEVELS.inRepair,
      reason: STOCK_ADJUSTMENT_REASON.LOST,
    });
    expect(mocks.showToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      STOCK_COUNT_COPY.SAVE_SUCCESS_TOAST
    );
  });

  it("sends the expiry date when the category has an expiry alert", async () => {
    const page = renderStockCountView();

    await page.setQuantity(
      STOCK_COUNT_COPY.AVAILABLE_LABEL,
      TYPED_AVAILABLE
    );
    page.setExpiryDate(TYPED_EXPIRY_DATE);
    await page.submit();

    await waitFor(() => {
      expect(mocks.adjust).toHaveBeenCalledWith(
        expect.objectContaining({
          expiryDate: TYPED_EXPIRY_DATE,
        })
      );
    });
  });

  it("registers the first count as the initial count, then offers a correction", async () => {
    const page = renderStockCountView({
      levels: STOCK_EMPTY_LEVELS,
      movements: [],
    });

    await page.setQuantity(
      STOCK_COUNT_COPY.AVAILABLE_LABEL,
      TYPED_AVAILABLE
    );
    await page.submit();

    await waitFor(() => {
      expect(
        page.getControl(STOCK_COUNT_COPY.REASON_LABEL)
      ).toHaveValue(
        STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION
      );
    });
    expect(mocks.adjust).toHaveBeenCalledWith(
      expect.objectContaining({
        reason: STOCK_ADJUSTMENT_REASON.INITIAL_COUNT,
      })
    );
  });
});
