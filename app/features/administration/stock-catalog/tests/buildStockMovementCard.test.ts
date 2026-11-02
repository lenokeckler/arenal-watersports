import { describe, expect, it } from "vitest";
import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_REASON_COPY } from "../constants/StockReasonCopy.constants";
import { buildStockMovementCard } from "../utils/buildStockMovementCard";
import { formatStockMovementDate } from "../utils/formatStockMovementDate";
import { DEFAULT_STOCK_MOVEMENT_ITEM } from "./Stock.constants";
import {
  EXPECTED_COSTA_RICA_TIME_PATTERN,
  EXPECTED_DATE_PATTERN,
} from "./StockCount.constants";

const ARROW = STOCK_COUNT_COPY.MOVEMENT_ARROW;

describe("buildStockMovementCard", () => {
  it("writes each state and the total as from to", () => {
    const card = buildStockMovementCard(
      DEFAULT_STOCK_MOVEMENT_ITEM
    );

    expect(card.lines).toEqual([
      `${STOCK_COUNT_COPY.AVAILABLE_LABEL}: 10 ${ARROW} 8`,
      `${STOCK_COUNT_COPY.DAMAGED_LABEL}: 2 ${ARROW} 2`,
      `${STOCK_COUNT_COPY.IN_REPAIR_LABEL}: 1 ${ARROW} 1`,
    ]);
    expect(card.totalText).toBe(
      `${STOCK_COUNT_COPY.TOTAL_LABEL}: 13 ${ARROW} 11`
    );
  });

  it("names the reason in Spanish", () => {
    expect(
      buildStockMovementCard(DEFAULT_STOCK_MOVEMENT_ITEM)
        .reasonLabel
    ).toBe(STOCK_REASON_COPY[STOCK_ADJUSTMENT_REASON.LOST]);
  });

  it("keeps a reason it does not know as written", () => {
    const unknownReason = "otro motivo";

    expect(
      buildStockMovementCard({
        ...DEFAULT_STOCK_MOVEMENT_ITEM,
        reason: unknownReason,
      }).reasonLabel
    ).toBe(unknownReason);
  });
});

describe("formatStockMovementDate", () => {
  it("shows the Costa Rica date and time of the movement", () => {
    const dateText = formatStockMovementDate(
      DEFAULT_STOCK_MOVEMENT_ITEM.createdAt
    );

    expect(dateText).toMatch(EXPECTED_DATE_PATTERN);
    expect(dateText).toMatch(
      EXPECTED_COSTA_RICA_TIME_PATTERN
    );
  });
});
