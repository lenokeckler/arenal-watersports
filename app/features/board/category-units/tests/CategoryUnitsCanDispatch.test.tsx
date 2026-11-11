import { render, screen } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import {
  readBoardCategory,
  readBoardCategoryUnits,
} from "@/app/services/board";
import CategoryUnits from "../CategoryUnits";
import { FAKE_TIMER_OPTIONS } from "./CategoryUnits.constants";
import {
  DEFAULT_BOARD_UNIT_ROW,
  OCCUPIED_BOARD_UNIT_ROW,
} from "./CategoryUnitRows.constants";
import {
  CATEGORY_ID,
  DEFAULT_BOARD_CATEGORY_ROW,
} from "./CategoryUnitsScreen.constants";

vi.mock("@/app/services/board", () => ({
  readBoardCategory: vi.fn(),
  readBoardCategoryGroup: vi.fn().mockResolvedValue([]),
  readBoardCategoryUnits: vi.fn(),
}));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<
    typeof import("next/navigation")
  >()),
  useRouter: () => ({ refresh: vi.fn() }),
}));

const renderScreen = async (canDispatch?: boolean) => {
  render(
    await CategoryUnits({
      canDispatch,
      categoryId: CATEGORY_ID,
      pageParam: undefined,
    })
  );
};

describe("CategoryUnits dispatch entry", () => {
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

  it("lets operations tap the available units of the category", async () => {
    await renderScreen(true);

    expect(
      screen.getAllByRole(ARIA_ROLE.CHECKBOX)
    ).toHaveLength(1);
  });

  it("stays read-only for a worker without the operations area", async () => {
    await renderScreen(false);

    expect(
      screen.queryAllByRole(ARIA_ROLE.CHECKBOX)
    ).toHaveLength(0);
  });

  it("is read-only by default", async () => {
    await renderScreen();

    expect(
      screen.queryAllByRole(ARIA_ROLE.CHECKBOX)
    ).toHaveLength(0);
  });
});
