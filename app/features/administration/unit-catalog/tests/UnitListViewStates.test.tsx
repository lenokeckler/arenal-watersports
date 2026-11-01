import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { resolveCategoryUnitsPath } from "../utils/resolveUnitPaths";
import { FAKE_CATEGORY_ID } from "./Unit.constants";
import {
  MIDDLE_PAGE,
  MIDDLE_PAGE_COUNT,
} from "./UnitList.constants";
import { createUnitListPage } from "./UnitList.page";
import { renderUnitListView } from "./renderUnitListView";

const refreshMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

describe("UnitListView states", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("shows the empty state when the category has no units", () => {
    renderUnitListView({ units: [] });

    expect(
      createUnitListPage().getEmptyStateTitle()
    ).toBeInTheDocument();
  });

  it("shows the error and refreshes the page on retry", async () => {
    renderUnitListView({ fetchFailed: true, units: [] });
    const unitListPage = createUnitListPage();

    expect(
      unitListPage.getErrorMessage()
    ).toBeInTheDocument();
    await unitListPage.clickRetry();

    expect(refreshMock).toHaveBeenCalledTimes(1);
  });

  it("links to the previous and next pages of the category units", () => {
    renderUnitListView({
      currentPage: MIDDLE_PAGE,
      pageCount: MIDDLE_PAGE_COUNT,
    });
    const unitListPage = createUnitListPage();
    const basePath = resolveCategoryUnitsPath(
      FAKE_CATEGORY_ID
    );

    expect(unitListPage.getPreviousLink()).toHaveAttribute(
      "href",
      resolveListPageHref(basePath, MIDDLE_PAGE - 1)
    );
    expect(unitListPage.getNextLink()).toHaveAttribute(
      "href",
      resolveListPageHref(basePath, MIDDLE_PAGE + 1)
    );
  });
});
