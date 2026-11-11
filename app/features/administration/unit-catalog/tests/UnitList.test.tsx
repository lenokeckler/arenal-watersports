import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { UNIT_CATEGORY_TRACKING_MODE } from "../constants/UnitCategoryTrackingMode.constants";
import { getUnitCategory } from "../services/getUnitCategory";
import { listUnits } from "../services/listUnits";
import UnitList from "../UnitList";
import { FAKE_CATEGORY_ID } from "./Unit.constants";
import {
  buildUnitCategory,
  DEFAULT_UNIT_CATEGORY,
  DEFAULT_UNIT_LIST_ITEM,
  LAST_PAGE_COUNT,
  LAST_PAGE_HREF,
  NOT_FOUND_ERROR_MESSAGE,
  PAGE_PAST_THE_END,
  REDIRECT_ERROR_MESSAGE,
  throwNavigation,
  MIDDLE_PAGE,
  MIDDLE_PAGE_COUNT,
} from "./UnitList.constants";

const mockedAdministratorCheck = vi.mocked(
  isAdministratorSignedIn
);
const mockedCategoryRead = vi.mocked(getUnitCategory);
const mockedUnitsRead = vi.mocked(listUnits);

const redirectMock = vi.hoisted(() => vi.fn());
const notFoundMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
  notFound: notFoundMock,
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock("../services/getUnitCategory");
vi.mock("../services/listUnits");

const renderUnitList = (pageParam?: string) =>
  UnitList({ categoryId: FAKE_CATEGORY_ID, pageParam });

describe("UnitList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation(
      throwNavigation(REDIRECT_ERROR_MESSAGE)
    );
    notFoundMock.mockImplementation(
      throwNavigation(NOT_FOUND_ERROR_MESSAGE)
    );
    mockedAdministratorCheck.mockResolvedValue(true);
    mockedCategoryRead.mockResolvedValue(
      DEFAULT_UNIT_CATEGORY
    );
    mockedUnitsRead.mockResolvedValue({
      units: [DEFAULT_UNIT_LIST_ITEM],
      pageCount: 1,
    });
  });

  it("redirects a worker who is not an administrator home without reading any category", async () => {
    mockedAdministratorCheck.mockResolvedValue(false);

    await expect(renderUnitList()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );

    expect(redirectMock).toHaveBeenCalledWith(PATHS.HOME);
    expect(getUnitCategory).not.toHaveBeenCalled();
  });

  it.each([
    ["does not exist", null],
    [
      "is counted by quantity",
      buildUnitCategory({
        trackingMode:
          UNIT_CATEGORY_TRACKING_MODE.BY_QUANTITY,
      }),
    ],
  ])(
    "shows not found when the category %s",
    async (_name, category) => {
      mockedCategoryRead.mockResolvedValue(category);

      await expect(renderUnitList()).rejects.toThrow(
        NOT_FOUND_ERROR_MESSAGE
      );

      expect(listUnits).not.toHaveBeenCalled();
    }
  );

  it("flags a failed read when the units cannot be loaded", async () => {
    mockedUnitsRead.mockRejectedValue(
      new Error("read failed")
    );

    const element = await renderUnitList();

    expect(element.props.fetchFailed).toBe(true);
  });

  it("reads the page named in the address and passes the category and its units to the view", async () => {
    mockedUnitsRead.mockResolvedValue({
      units: [DEFAULT_UNIT_LIST_ITEM],
      pageCount: MIDDLE_PAGE_COUNT,
    });

    const element = await renderUnitList(`${MIDDLE_PAGE}`);

    expect(listUnits).toHaveBeenCalledWith(
      FAKE_CATEGORY_ID,
      MIDDLE_PAGE
    );
    expect(element.props).toEqual({
      category: DEFAULT_UNIT_CATEGORY,
      currentPage: MIDDLE_PAGE,
      fetchFailed: false,
      pageCount: MIDDLE_PAGE_COUNT,
      units: [DEFAULT_UNIT_LIST_ITEM],
    });
  });

  it("sends the worker to the last page when the requested page is past the end", async () => {
    mockedUnitsRead.mockResolvedValue({
      units: [],
      pageCount: LAST_PAGE_COUNT,
    });

    await expect(
      renderUnitList(PAGE_PAST_THE_END)
    ).rejects.toThrow(REDIRECT_ERROR_MESSAGE);

    expect(redirectMock).toHaveBeenCalledWith(
      LAST_PAGE_HREF
    );
  });
});
