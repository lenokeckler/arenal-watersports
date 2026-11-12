import { describe, expect, it, vi } from "vitest";
import {
  readBoardCategory,
  readBoardCategoryUnits,
} from "@/app/services/board";
import { DEFAULT_BOARD_UNIT_ROW } from "./CategoryUnitRows.constants";
import {
  buildBoardCategoryRow,
  PAGE_PARAM,
  PAGE_STATUS,
  TAP_TARGET_CLASS,
  TOTAL_COUNT,
} from "./CategoryUnitsScreen.constants";
import { renderCategoryUnits } from "./renderCategoryUnits";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock(
  "@/app/components/board-realtime/BoardRealtime",
  () => ({
    default: () => null,
  })
);

vi.mock("@/app/services/board", () => ({
  readBoardCategory: vi.fn(),
  readBoardCategoryGroup: vi.fn().mockResolvedValue([]),
  readBoardCategoryUnits: vi.fn(),
}));

describe("CategoryUnitsPagination targets", () => {
  it("shows the page as text between large previous and next targets", async () => {
    vi.mocked(readBoardCategory).mockResolvedValue(
      buildBoardCategoryRow({
        total_count: TOTAL_COUNT.SEVERAL_PAGES,
      })
    );
    vi.mocked(readBoardCategoryUnits).mockResolvedValue([
      DEFAULT_BOARD_UNIT_ROW,
    ]);
    const page = await renderCategoryUnits(
      PAGE_PARAM.SECOND
    );
    const previous = page.queryPreviousLink();
    const next = page.queryNextLink();
    const status = page.getPageText(
      PAGE_STATUS.SECOND_OF_MANY
    );

    expect(page.getPagination()).toBeInTheDocument();
    expect(previous).toHaveClass(TAP_TARGET_CLASS);
    expect(next).toHaveClass(TAP_TARGET_CLASS);
    expect(
      previous && page.precedes(previous, status)
    ).toBe(true);
    expect(next && page.precedes(status, next)).toBe(true);
  });
});
