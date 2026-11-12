import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  readBoardCategory,
  readBoardCategoryUnits,
} from "@/app/services/board";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  buildBoardCategoryRow,
  NAVIGATION_SIGNAL,
  PAGE,
  READ_FAILURE_MESSAGE,
  TOTAL_COUNT,
} from "./CategoryUnitsScreen.constants";
import { renderCategoryUnits } from "./renderCategoryUnits";

const navigation = vi.hoisted(() => ({
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("next/navigation", () => navigation);

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

const mockCategoryWithoutUnits = () => {
  vi.mocked(readBoardCategory).mockResolvedValue(
    buildBoardCategoryRow({
      total_count: TOTAL_COUNT.EMPTY,
    })
  );
};

describe("CategoryUnits missing data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navigation.redirect.mockImplementation(() => {
      throw new Error(NAVIGATION_SIGNAL.REDIRECT);
    });
    navigation.notFound.mockImplementation(() => {
      throw new Error(NAVIGATION_SIGNAL.NOT_FOUND);
    });
    vi.mocked(readBoardCategory).mockResolvedValue(
      buildBoardCategoryRow()
    );
    vi.mocked(readBoardCategoryUnits).mockResolvedValue([]);
  });

  it("answers not found when the category is not on the board, reading no units", async () => {
    vi.mocked(readBoardCategory).mockResolvedValue(null);

    await expect(renderCategoryUnits()).rejects.toThrow(
      NAVIGATION_SIGNAL.NOT_FOUND
    );

    expect(readBoardCategoryUnits).not.toHaveBeenCalled();
  });

  it("shows the empty state, without list or pagination, when the category has no units", async () => {
    mockCategoryWithoutUnits();
    const page = await renderCategoryUnits();

    expect(
      page.getPageText(CATEGORY_UNITS_COPY.EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(page.queryList()).not.toBeInTheDocument();
    expect(page.queryNextLink()).not.toBeInTheDocument();
    expect(readBoardCategoryUnits).not.toHaveBeenCalled();
  });

  it("keeps the empty state, without redirecting, on a page param when there are no units", async () => {
    mockCategoryWithoutUnits();
    const page = await renderCategoryUnits(
      String(PAGE.SECOND)
    );

    expect(
      page.getPageText(CATEGORY_UNITS_COPY.EMPTY_BODY)
    ).toBeInTheDocument();
    expect(navigation.redirect).not.toHaveBeenCalled();
  });

  it("lets a category read failure reach the error boundary", async () => {
    vi.mocked(readBoardCategory).mockRejectedValue(
      new Error(READ_FAILURE_MESSAGE)
    );

    await expect(renderCategoryUnits()).rejects.toThrow(
      READ_FAILURE_MESSAGE
    );
  });

  it("lets a units read failure reach the error boundary instead of an empty list", async () => {
    vi.mocked(readBoardCategoryUnits).mockRejectedValue(
      new Error(READ_FAILURE_MESSAGE)
    );

    await expect(renderCategoryUnits()).rejects.toThrow(
      READ_FAILURE_MESSAGE
    );
  });
});
