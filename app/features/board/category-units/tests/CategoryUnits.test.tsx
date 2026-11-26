import { screen } from "@testing-library/react";
import { BOARD_UNIT_FILTER } from "@/app/constants";
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
import {
  CATEGORY_NAME,
  DEFAULT_UNIT_OCCUPANCY,
  FAKE_TIMER_OPTIONS,
  UNIT_CODE,
} from "./CategoryUnits.constants";
import {
  DEFAULT_BOARD_UNIT_ROW,
  OCCUPIED_BOARD_UNIT_ROW,
} from "./CategoryUnitRows.constants";
import {
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
  readBoardUnitStatusDetails: vi.fn().mockResolvedValue({
    damages: [],
    jobs: [],
  }),
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

  it("puts the status filter in the header row and no unit count text", async () => {
    const page = await renderCategoryUnits();

    expect(
      screen.getByRole("button", {
        name: /Mostrar unidades/,
      })
    ).toBeInTheDocument();
    expect(
      page.queryPageText(
        `${TOTAL_COUNT.TWO_UNITS} unidades`
      )
    ).not.toBeInTheDocument();
  });

  it("links back to the board", async () => {
    const page = await renderCategoryUnits();

    expect(page.getBackLink()).toHaveAttribute(
      "href",
      PATHS.BOARD
    );
  });

  it("lists the units of the page with the return time of the occupied one and no customer on any card", async () => {
    const page = await renderCategoryUnits();
    const occupied = page.getUnit(UNIT_CODE.OCCUPIED);

    expect(page.getUnits()).toHaveLength(
      TOTAL_COUNT.TWO_UNITS
    );
    expect(
      page.getReturnText(occupied)
    ).toBeInTheDocument();
    expect(
      page.queryText(
        occupied,
        DEFAULT_UNIT_OCCUPANCY.customerName
      )
    ).not.toBeInTheDocument();
  });

  it("reads the first page of the category units by default", async () => {
    await renderCategoryUnits();

    expect(readBoardCategoryUnits).toHaveBeenCalledWith(
      CATEGORY_ID,
      PAGE.FIRST,
      BOARD_UNIT_FILTER.ALL
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
