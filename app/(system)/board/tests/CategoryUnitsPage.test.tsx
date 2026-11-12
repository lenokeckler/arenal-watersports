import { isValidElement } from "react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ensureWorkModeChosen } from "@/app/features/access/work-mode/ensureWorkModeChosen";
import CategoryUnits from "@/app/features/board/category-units/CategoryUnits";
import { CATEGORY_UNITS_METADATA } from "@/app/features/board/category-units/constants/CategoryUnitsMetadata.constants";
import { hasOperationsArea } from "@/app/services/operations/hasOperationsArea";
import CategoryUnitsPage, {
  metadata,
} from "../categories/[categoryId]/page";
import {
  buildCategoryUnitsPageProps,
  CATEGORY_ID,
  MODE_REDIRECT_MESSAGE,
  PAGE_PARAM,
} from "./CategoryUnitsPage.constants";

vi.mock(
  "@/app/features/access/work-mode/ensureWorkModeChosen",
  () => ({
    ensureWorkModeChosen: vi.fn(),
  })
);

vi.mock(
  "@/app/services/operations/hasOperationsArea",
  () => ({
    hasOperationsArea: vi.fn(),
  })
);

vi.mock(
  "@/app/features/board/category-units/CategoryUnits",
  () => ({
    default: vi.fn(),
  })
);

describe("CategoryUnitsPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("exports the category units metadata", () => {
    expect(metadata).toBe(CATEGORY_UNITS_METADATA);
  });

  it("renders the units of the route category with the page param once the work mode check passes", async () => {
    vi.mocked(ensureWorkModeChosen).mockResolvedValue();
    vi.mocked(hasOperationsArea).mockResolvedValue(false);

    const page = await CategoryUnitsPage(
      buildCategoryUnitsPageProps(PAGE_PARAM)
    );

    expect(ensureWorkModeChosen).toHaveBeenCalledTimes(1);
    expect(isValidElement(page)).toBe(true);
    expect(page.type).toBe(CategoryUnits);
    expect(page.props).toEqual({
      canDispatch: false,
      categoryId: CATEGORY_ID,
      pageParam: PAGE_PARAM,
    });
  });

  it("lets the screen dispatch when the worker has the operations area", async () => {
    vi.mocked(ensureWorkModeChosen).mockResolvedValue();
    vi.mocked(hasOperationsArea).mockResolvedValue(true);

    const page = await CategoryUnitsPage(
      buildCategoryUnitsPageProps()
    );

    expect(page.props.canDispatch).toBe(true);
  });

  it("passes no page param when the url has none", async () => {
    vi.mocked(ensureWorkModeChosen).mockResolvedValue();
    vi.mocked(hasOperationsArea).mockResolvedValue(false);

    const page = await CategoryUnitsPage(
      buildCategoryUnitsPageProps()
    );

    expect(page.props.pageParam).toBeUndefined();
  });

  it("rejects before any units screen is built when the check redirects", async () => {
    vi.mocked(ensureWorkModeChosen).mockRejectedValue(
      new Error(MODE_REDIRECT_MESSAGE)
    );

    await expect(
      CategoryUnitsPage(buildCategoryUnitsPageProps())
    ).rejects.toThrow(MODE_REDIRECT_MESSAGE);
    expect(CategoryUnits).not.toHaveBeenCalled();
  });
});
