import { describe, expect, it, vi } from "vitest";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_SYMBOL } from "../constants/StockCountSymbol.constants";
import { renderStockCountView } from "./renderStockCountView";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/adjustStockAction", () => ({
  adjustStockAction: vi.fn(),
}));

const ARROW = STOCK_COUNT_COPY.MOVEMENT_ARROW;

describe("StockCountView live preview", () => {
  it("shows no difference before anything is edited", () => {
    const page = renderStockCountView();

    expect(page.getSummaryTotal()).not.toHaveTextContent(
      ARROW
    );
    expect(page.getSummaryTotal()).toHaveTextContent("13");
  });

  it("shows the signed difference in the edited block and the old to new total", async () => {
    const page = renderStockCountView();

    await page.increase(STOCK_COUNT_COPY.AVAILABLE_LABEL);
    await page.increase(STOCK_COUNT_COPY.AVAILABLE_LABEL);
    await page.decrease(STOCK_COUNT_COPY.DAMAGED_LABEL);

    expect(
      page
        .getQuantityBlock(STOCK_COUNT_COPY.AVAILABLE_LABEL)
        .getByText(`${STOCK_COUNT_SYMBOL.PLUS}2`)
    ).toBeInTheDocument();
    expect(
      page
        .getQuantityBlock(STOCK_COUNT_COPY.DAMAGED_LABEL)
        .getByText(`${STOCK_COUNT_SYMBOL.MINUS}1`)
    ).toBeInTheDocument();
    expect(page.getSummaryTotal()).toHaveTextContent(
      `13 ${ARROW} 14`
    );
  });

  it("splits the typed units into usable and needing attention", async () => {
    const page = renderStockCountView();

    await page.increase(STOCK_COUNT_COPY.IN_REPAIR_LABEL);

    expect(
      page.getText(STOCK_COUNT_COPY.AVAILABLE_FOR_USE_LABEL)
    ).toBeInTheDocument();
    expect(
      page.getText(STOCK_COUNT_COPY.NEEDS_ATTENTION_LABEL)
    ).toBeInTheDocument();
  });

  it("never lets the minus button go below zero", async () => {
    const page = renderStockCountView();

    await page.decrease(STOCK_COUNT_COPY.IN_REPAIR_LABEL);
    await page.decrease(STOCK_COUNT_COPY.IN_REPAIR_LABEL);

    expect(
      page.getQuantityInput(
        STOCK_COUNT_COPY.IN_REPAIR_LABEL
      )
    ).toHaveValue("0");
  });
});
