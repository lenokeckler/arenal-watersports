import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import {
  readBoardCategory,
  readBoardCategoryUnits,
} from "@/app/services/board";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_NAME,
  EXPECTED_TIME,
  FAKE_TIMER_OPTIONS,
  UNIT_CODE,
} from "./CategoryUnits.constants";
import {
  DEFAULT_BOARD_UNIT_ROW,
  OCCUPIED_BOARD_UNIT_ROW,
} from "./CategoryUnitRows.constants";
import {
  buildBoardCategoryRow,
  CATEGORY_ID,
  DEFAULT_BOARD_CATEGORY_ROW,
  PAGE,
  TOTAL_COUNT,
} from "./CategoryUnitsScreen.constants";
import { renderCategoryUnits } from "./renderCategoryUnits";

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

describe("CategoryUnits", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(FAKE_TIMER_OPTIONS);
    vi.mocked(readBoardCategory).mockResolvedValue(
      DEFAULT_BOARD_CATEGORY_ROW
    );
    vi.mocked(readBoardCategoryUnits).mockResolvedValue([
      DEFAULT_BOARD_UNIT_ROW,
      OCCUPIED_BOARD_UNIT_ROW,
    ]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("titles the screen with the category name inside one main landmark", async () => {
    const page = await renderCategoryUnits();

    expect(page.getMain()).toBeInTheDocument();
    expect(page.getTitle()).toHaveTextContent(
      CATEGORY_NAME
    );
  });

  it("states the unit count under the title", async () => {
    const page = await renderCategoryUnits();

    expect(
      page.getPageText(
        CATEGORY_UNITS_COPY.UNITS_COUNT(
          TOTAL_COUNT.TWO_UNITS
        )
      )
    ).toBeInTheDocument();
  });

  it("uses the singular when the category has one unit", async () => {
    vi.mocked(readBoardCategory).mockResolvedValue(
      buildBoardCategoryRow({
        total_count: TOTAL_COUNT.ONE_UNIT,
      })
    );
    const page = await renderCategoryUnits();

    expect(
      page.getPageText(
        CATEGORY_UNITS_COPY.UNITS_COUNT(
          TOTAL_COUNT.ONE_UNIT
        )
      )
    ).toBeInTheDocument();
  });

  it("links back to the board", async () => {
    const page = await renderCategoryUnits();

    expect(page.getBackLink()).toHaveAttribute(
      "href",
      PATHS.BOARD
    );
  });

  it("lists the units of the page with the occupied detail only on the occupied one", async () => {
    const page = await renderCategoryUnits();

    expect(page.getUnits()).toHaveLength(
      TOTAL_COUNT.TWO_UNITS
    );
    expect(
      page.getReturnText(page.getUnit(UNIT_CODE.OCCUPIED))
    ).toHaveTextContent(EXPECTED_TIME.TODAY);
    expect(
      page.queryReturnText(
        page.getUnit(UNIT_CODE.AVAILABLE)
      )
    ).not.toBeInTheDocument();
  });

  it("reads the first page of the category units by default", async () => {
    await renderCategoryUnits();

    expect(readBoardCategoryUnits).toHaveBeenCalledWith(
      CATEGORY_ID,
      PAGE.FIRST
    );
  });

  it("puts no link and no button inside any unit row", async () => {
    const page = await renderCategoryUnits();

    page.getUnits().forEach((unit) => {
      expect(
        page.getInteractiveElements(unit)
      ).toHaveLength(0);
    });
  });
});
