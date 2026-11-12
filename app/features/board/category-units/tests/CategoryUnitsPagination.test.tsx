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
import { DEFAULT_BOARD_UNIT_ROW } from "./CategoryUnitRows.constants";
import {
  buildBoardCategoryRow,
  CATEGORY_ID,
  DEFAULT_BOARD_CATEGORY_ROW,
  FIRST_PAGE_HREF,
  LAST_PAGE_HREF,
  NAVIGATION_SIGNAL,
  PAGE,
  PAGE_PARAM,
  PAGE_STATUS,
  SECOND_PAGE_HREF,
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

const mockSeveralPages = () => {
  vi.mocked(readBoardCategory).mockResolvedValue(
    buildBoardCategoryRow({
      total_count: TOTAL_COUNT.SEVERAL_PAGES,
    })
  );
};

describe("CategoryUnits pagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    navigation.redirect.mockImplementation(() => {
      throw new Error(NAVIGATION_SIGNAL.REDIRECT);
    });
    navigation.notFound.mockImplementation(() => {
      throw new Error(NAVIGATION_SIGNAL.NOT_FOUND);
    });
    vi.mocked(readBoardCategory).mockResolvedValue(
      DEFAULT_BOARD_CATEGORY_ROW
    );
    vi.mocked(readBoardCategoryUnits).mockResolvedValue([
      DEFAULT_BOARD_UNIT_ROW,
    ]);
  });

  it("shows no pagination when every unit fits in one page", async () => {
    const page = await renderCategoryUnits();

    expect(page.queryNextLink()).not.toBeInTheDocument();
    expect(
      page.queryPreviousLink()
    ).not.toBeInTheDocument();
    expect(
      page.queryPageText(PAGE_STATUS.FIRST_OF_MANY)
    ).not.toBeInTheDocument();
  });

  it("shows the page status and a next link on the first of several pages", async () => {
    mockSeveralPages();
    const page = await renderCategoryUnits();

    expect(
      page.getPageText(PAGE_STATUS.FIRST_OF_MANY)
    ).toBeInTheDocument();
    expect(page.queryNextLink()).toHaveAttribute(
      "href",
      SECOND_PAGE_HREF
    );
    expect(
      page.queryPreviousLink()
    ).not.toBeInTheDocument();
  });

  it("reads the requested page and links to its neighbours", async () => {
    mockSeveralPages();
    const page = await renderCategoryUnits(
      PAGE_PARAM.SECOND
    );

    expect(readBoardCategoryUnits).toHaveBeenCalledWith(
      CATEGORY_ID,
      PAGE.SECOND
    );
    expect(page.queryPreviousLink()).toHaveAttribute(
      "href",
      FIRST_PAGE_HREF
    );
    expect(page.queryNextLink()).toHaveAttribute(
      "href",
      LAST_PAGE_HREF
    );
  });

  it.each([PAGE_PARAM.INVALID, undefined])(
    "falls back to the first page for the page param %s",
    async (pageParam) => {
      mockSeveralPages();
      await renderCategoryUnits(pageParam);

      expect(readBoardCategoryUnits).toHaveBeenCalledWith(
        CATEGORY_ID,
        PAGE.FIRST
      );
    }
  );

  it("uses the first value of a repeated page param", async () => {
    mockSeveralPages();
    await renderCategoryUnits([...PAGE_PARAM.ARRAY]);

    expect(readBoardCategoryUnits).toHaveBeenCalledWith(
      CATEGORY_ID,
      PAGE.SECOND
    );
  });

  it("redirects to the last page when the page is past the end, reading no units", async () => {
    mockSeveralPages();

    await expect(
      renderCategoryUnits(String(PAGE.PAST_THE_END))
    ).rejects.toThrow(NAVIGATION_SIGNAL.REDIRECT);

    expect(navigation.redirect).toHaveBeenCalledWith(
      LAST_PAGE_HREF
    );
    expect(readBoardCategoryUnits).not.toHaveBeenCalled();
  });
});
