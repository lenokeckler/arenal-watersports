import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  readBoardCategory,
  readBoardCategoryGroup,
  readBoardCategoryUnits,
} from "@/app/services/board";
import {
  GROUP_DOUBLE,
  GROUP_INDIVIDUAL,
  GROUP_MEMBERS,
} from "./CategoryGroupSwitch.constants";
import { DEFAULT_BOARD_UNIT_ROW } from "./CategoryUnitRows.constants";
import {
  CATEGORY_ID,
  DEFAULT_BOARD_CATEGORY_ROW,
  READ_FAILURE_MESSAGE,
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
  readBoardCategoryGroup: vi.fn(),
  readBoardCategoryUnits: vi.fn(),
}));

describe("CategoryUnits group switch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(readBoardCategory).mockResolvedValue(
      DEFAULT_BOARD_CATEGORY_ROW
    );
    vi.mocked(readBoardCategoryUnits).mockResolvedValue([
      DEFAULT_BOARD_UNIT_ROW,
    ]);
    vi.mocked(readBoardCategoryGroup).mockResolvedValue(
      GROUP_MEMBERS
    );
  });

  it("shows the switch links of the group under the header", async () => {
    const page = await renderCategoryUnits();

    expect(page.getSwitchLinks()).toHaveLength(
      GROUP_MEMBERS.length
    );
    expect(
      page.getSwitchLink(GROUP_INDIVIDUAL.name)
    ).toBeInTheDocument();
  });

  it("reads the group of the category on screen", async () => {
    await renderCategoryUnits();

    expect(readBoardCategoryGroup).toHaveBeenCalledWith(
      CATEGORY_ID
    );
  });

  it("shows no switch when the category has no group", async () => {
    vi.mocked(readBoardCategoryGroup).mockResolvedValue([]);
    const page = await renderCategoryUnits();

    expect(page.queryGroupSwitch()).not.toBeInTheDocument();
  });

  it("shows no switch when the category is alone in its group", async () => {
    vi.mocked(readBoardCategoryGroup).mockResolvedValue([
      GROUP_DOUBLE,
    ]);
    const page = await renderCategoryUnits();

    expect(page.queryGroupSwitch()).not.toBeInTheDocument();
  });

  it("lets a group read failure reach the error boundary", async () => {
    vi.mocked(readBoardCategoryGroup).mockRejectedValue(
      new Error(READ_FAILURE_MESSAGE)
    );

    await expect(renderCategoryUnits()).rejects.toThrow(
      READ_FAILURE_MESSAGE
    );
  });
});
