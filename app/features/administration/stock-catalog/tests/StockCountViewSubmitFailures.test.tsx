import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { waitFor } from "@testing-library/react";
import { STATUS } from "@/app/constants";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import {
  FRACTION_QUANTITY_TEXT,
  INVALID_QUANTITY_TEXT,
  SAVE_ERROR_MESSAGE,
  SAVE_ERROR_RESULT,
  SAVE_SUCCESS_RESULT,
  TYPED_AVAILABLE,
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

describe("StockCountView submit failures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.adjust.mockResolvedValue(SAVE_SUCCESS_RESULT);
  });

  it("toasts the Spanish error of the action result and does not refresh", async () => {
    mocks.adjust.mockResolvedValue(SAVE_ERROR_RESULT);
    const page = renderStockCountView();

    await page.setQuantity(
      STOCK_COUNT_COPY.AVAILABLE_LABEL,
      TYPED_AVAILABLE
    );
    await page.submit();

    await waitFor(() => {
      expect(mocks.showToast).toHaveBeenCalledWith(
        STATUS.ERROR,
        SAVE_ERROR_MESSAGE
      );
    });
    expect(mocks.refresh).not.toHaveBeenCalled();
  });

  it("toasts a generic error when the action throws", async () => {
    mocks.adjust.mockRejectedValue(new Error("offline"));
    const page = renderStockCountView();

    await page.setQuantity(
      STOCK_COUNT_COPY.AVAILABLE_LABEL,
      TYPED_AVAILABLE
    );
    await page.submit();

    await waitFor(() => {
      expect(mocks.showToast).toHaveBeenCalledWith(
        STATUS.ERROR,
        STOCK_CATALOG_COPY.ADJUSTMENT_FAILED_ERROR
      );
    });
  });

  it.each([INVALID_QUANTITY_TEXT, FRACTION_QUANTITY_TEXT])(
    "marks a quantity typed as %s and does not call the action",
    async (typedText) => {
      const page = renderStockCountView();

      await page.setQuantity(
        STOCK_COUNT_COPY.DAMAGED_LABEL,
        typedText
      );
      await page.submit();

      expect(
        page.getText(
          STOCK_CATALOG_COPY.QUANTITY_INVALID_ERROR
        )
      ).toBeInTheDocument();
      expect(mocks.adjust).not.toHaveBeenCalled();
    }
  );

  it("refuses an unchanged count with the form error", async () => {
    const page = renderStockCountView();

    await page.submit();

    expect(page.getAlert()).toHaveTextContent(
      STOCK_CATALOG_COPY.ADJUSTMENT_UNCHANGED_ERROR
    );
    expect(mocks.adjust).not.toHaveBeenCalled();
  });

  it("clears the form error as soon as a field changes", async () => {
    const page = renderStockCountView();
    await page.submit();

    await page.setQuantity(
      STOCK_COUNT_COPY.AVAILABLE_LABEL,
      TYPED_AVAILABLE
    );

    expect(page.getAlert()).not.toBeInTheDocument();
  });

  it("disables the save button while the request is in flight", async () => {
    mocks.adjust.mockReturnValue(
      new Promise(() => undefined)
    );
    const page = renderStockCountView();

    await page.setQuantity(
      STOCK_COUNT_COPY.AVAILABLE_LABEL,
      TYPED_AVAILABLE
    );
    await page.submit();

    expect(page.getSavingButton()).toBeDisabled();
    expect(
      page.getQuantityInput(
        STOCK_COUNT_COPY.AVAILABLE_LABEL
      )
    ).toBeDisabled();
  });
});
